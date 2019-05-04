import { Injectable } from '@angular/core';
import { max } from 'd3-array';
import { scaleBand, scaleLinear, ScaleBand, ScaleContinuousNumeric } from 'd3-scale';
import filter from 'ramda/src/filter';
import groupBy from 'ramda/src/groupBy';
import map from 'ramda/src/map';
import path from 'ramda/src/path';
import pipe from 'ramda/src/pipe';
import prop from 'ramda/src/prop';
import sum from 'ramda/src/sum';
import { of } from 'rxjs';
import { separateDigits } from 'utils';
import { Store } from 'utils';

import { Statistics } from '../constants';

const textLeftPosition = 13;
const strokeWidth = 1;
const paddingInner = 0.085;
export const margin = {
  top: 0,
  left: 70,
  bottom: 24,
  right: 30,
  get height() {
    return `calc(40% - ${this.top + this.bottom}px)`;
  }
};

export interface GroupValue {
  group: string;
  value: number;
}

export interface Tooltip {
  left: number;
  top: number;
  reverse: boolean;
}

export interface ChartBar {
  value: number;
  key: string;
  color: string;
  inaccurate: boolean;
}

export interface VbarChartDatum {
  group?: string;
  key: string;
  values: Array<ChartBar>;
}

export interface VBarState {
  tooltip: Tooltip;
  chartSize: {
    width: number;
    height: number;
  };
  activeGroup: string;
  activeKey: string;
  activeColor: string;
  activeSubgroup: string;
  groupValues?: Array<GroupValue>;
}

const initialState: VBarState = {
  tooltip: null,
  activeGroup: null,
  activeSubgroup: null,
  activeKey: null,
  activeColor: null,
  chartSize: null,
  groupValues: null
};

@Injectable()
export class VbarChartService {
  statistic: Statistics;
  store = new Store(initialState);
  strokeWidth = strokeWidth;
  groups: Array<string>;
  data: Array<VbarChartDatum>;
  groupField: string;
  chartHeight: number;
  chartWidth: number;
  xScale: ScaleBand<string>;
  yScale: ScaleContinuousNumeric<number, number>;
  groupScale = scaleBand().padding(0);
  yTicks: Array<number>;

  constructor() {
  }

  get rectWidth() {
    return this.xScale.bandwidth() + this.xScale.bandwidth() * paddingInner + this.strokeWidth * 2;
  }

  get rectXPosition() {
    return -this.xScale.bandwidth() * paddingInner / 2;
  }

  get verticalTextXPosition() {
    return -this.xScale.bandwidth() * paddingInner / 2 - textLeftPosition + this.strokeWidth * 2;
  }

  get horizontalLineX2Position() {
    return this.chartWidth + this.xScale.bandwidth() * paddingInner / 2;
  }

  format(value: number) {
    const inPercentages = this.statistic === Statistics.VolumePercent || this.statistic === Statistics.CostRUBPercent;

    return inPercentages ? `${separateDigits(value)}%` : separateDigits(value);
  }

  getGroupValues(activeKey: string) {
    const groups = groupBy((value) => value[this.groupField], this.data);
    const values =
      map(pipe(map(pipe(
        path(['values']),
        filter(value => value.key === activeKey),
        map(pipe(
          prop('value'),
          Number))
        )), sum
      ))(Object.values(groups));

    return Object.keys(groups).map((group, index) => ({
      group: group,
      value: values[index] / sum(values)
    }));
  }

  setActiveGroup(activeGroup: string) {
    this.store.setState(of({
      ...this.store.getState(),
      activeGroup: activeGroup
    }));
  }

  setActiveSubgroup(activeSubgroup: string) {
    this.store.setState(of({
      ...this.store.getState(),
      activeSubgroup: activeSubgroup
    }));
  }

  setActiveKey(activeKey: string, activeColor: string) {
    const groupValues = this.groupField ? this.getGroupValues(activeKey) : [];

    this.store.setState(of({
      ...this.store.getState(),
      activeKey: activeKey,
      activeColor: activeColor,
      groupValues: groupValues
    }));
  }

  getTickTransformX(value: string) {
    return `translate(${this.xScale(value) + this.xScale.bandwidth() / 2}, ${this.chartHeight + 20})`;
  }

  getTickTransformY(value: number) {
    return `translate(0, ${this.yScale(value)})`;
  }

  getRectTransformX(value: string) {
    return `translate(${this.xScale(value)}, 0)`;
  }

  getActiveColor(index: number, group: string, subgroup: string) {
    const currentState = this.store.getState();
    if (!currentState.activeSubgroup) {
      return index % 2 ? 'transparent' : '#DDE1E8';
    } else {
      const isActive = currentState.activeSubgroup === subgroup && currentState.activeGroup === group;
      return isActive ? '#DDE1E8' : 'transparent';
    }
  }

  update(chartWidth: number, chartHeight: number) {
    const maxValue = max(this.data, d => max(d.values.map(value => value.value)));

    this.chartHeight = chartHeight;
    this.chartWidth = chartWidth;
    this.groups = this.data[0].values.map(value => value.key);

    this.xScale = scaleBand().rangeRound([0, this.chartWidth]).paddingInner(paddingInner);
    this.yScale = scaleLinear().rangeRound([this.chartHeight, 0]);
    this.xScale.domain(this.data.map(d => d.key));
    this.yScale.domain([0, maxValue]).nice();

    const ticks = this.yScale.ticks();
    const maxTick = ticks[ticks.length - 1];
    const newMaxTick = maxTick / ticks.length + maxTick;
    this.yScale.domain([0, newMaxTick]).nice();

    this.groupScale.domain(this.groups).rangeRound([0, this.xScale.bandwidth()]);
    this.yTicks = this.yScale.ticks();

    this.store.setState(of({
      ...this.store.getState(),
      chartSize: {
        width: this.chartWidth,
        height: this.chartHeight
      }
    }));
  }
}
