import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime, ScaleLinear, ScaleTime } from 'd3-scale';
import { timeDay, timeMonth, timeWeek, CountableTimeInterval } from 'd3-time';
import { min } from 'date-fns';
import { addWeeks, lastDayOfWeek, subDays, subMonths } from 'date-fns/esm';
import compose from 'ramda/src/compose';
import flatten from 'ramda/src/flatten';
import pluck from 'ramda/src/pluck';
import { firstDayOfWeek } from 'utils';

import { Detalizations, Statistics } from '../constants';

export interface LineChartPoint {
  id: number;
  date: number;
  value: number;
  inaccurate?: boolean;
}

export interface LineChartDatum {
  id: number;
  name: string;
  color: string;
  points: LineChartPoint[];
  maxPoint: number;
}

export const style = {
  margin: {
    left: 5,
    right: 40,
    top: 5,
    bottom: 30
  },
  width: 520,
  height: 284,
  sliderHeight: 35
};

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnChanges {
  style = style;
  @Input() tooltipAlwaysVisible: boolean;
  @Input() yAxisAlwaysStartsFromZero: boolean;
  @Input() data: LineChartDatum[] = [];
  @Input() statistic: Statistics;
  @Input() detalization: Detalizations;
  @Input() highlightedIndex: number = null;
  @Input() availableDomain = [subMonths(new Date(), 24), new Date()];
  @Input() selectedDomain = [subMonths(new Date(), 24), new Date()];
  @Output() selectedDomainChange = new EventEmitter<Date[]>();
  correctedDomain = [];
  timeFunc: CountableTimeInterval = timeMonth;
  scales: {
    month: ScaleTime<number, number>,
    value: ScaleLinear<number, number>,
    dayLabels: ScaleTime<number, number>,
    week: ScaleTime<number, number>,
    sliderMonth: ScaleTime<number, number>,
    sliderValue: ScaleLinear<number, number>
  };

  constructor(private cd: ChangeDetectorRef) { }

  get valueScaleTicks() {
    return this.scales ? this.scales.value.ticks(5) : [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data || changes.availableDomain || changes.selectedDomain) {
      this.computeScales();
    }
    if (changes.detalization) {
      switch (changes.detalization.currentValue) {
        case (Detalizations.Day):
          this.timeFunc = timeDay;
          break;
        case (Detalizations.Week):
          this.timeFunc = timeWeek;
          break;
        case (Detalizations.Month):
          this.timeFunc = timeMonth;
          break;
        default:
          this.timeFunc = timeMonth;
          break;
      }
    }
  }

  computeScales() {
    const allPoints = <LineChartPoint[]>compose(
      flatten(),
      pluck('points')
    )(this.data);

    const sliderMonthScale = scaleTime()
      .range([0, style.width])
      .domain(this.availableDomain);

    const monthScaleDomain = [...this.selectedDomain];

    monthScaleDomain[1] = monthScaleDomain[1] <= this.maxDate ? monthScaleDomain[1] : this.maxDate;
    const weekScaleDomain = [];

    const dayLabelsScale = scaleTime()
      .range([15, style.width - 15])
      .domain(monthScaleDomain);

    let pointsWithinMonthDomain: LineChartPoint[];

    if (this.detalization === Detalizations.Week) {
      pointsWithinMonthDomain = allPoints.filter(datum => {
        const first = firstDayOfWeek(new Date(datum.date));
        const last = lastDayOfWeek(new Date(datum.date));
        return first > monthScaleDomain[0] &&
          first < addWeeks(monthScaleDomain[1], 1) ||
          last > monthScaleDomain[0] &&
          last < addWeeks(monthScaleDomain[1], 1);
      });
      const dates = pointsWithinMonthDomain.map(point => firstDayOfWeek(new Date(point.date)));

      weekScaleDomain[0] = monthScaleDomain[0] > min(dates) ? min(dates) : monthScaleDomain[0];
      weekScaleDomain[1] = max(dates);

      const fromDate = timeWeek.range(weekScaleDomain[0], addWeeks(weekScaleDomain[1], 1)).map(
        date => subDays(date, 6)
      ).filter(date => date >= weekScaleDomain[0])[0];
      weekScaleDomain[0] = fromDate;
    } else {
      pointsWithinMonthDomain = allPoints.filter(datum =>
        datum.date >= monthScaleDomain[0].valueOf() &&
        datum.date <= monthScaleDomain[1].valueOf()
      );
    }

    const monthScale = scaleTime()
      .range([0, style.width])
      .domain(monthScaleDomain);

    const weekScale = scaleTime()
      .range([0, style.width])
      .domain(weekScaleDomain);

    const valueScaleDomain = this.yAxisAlwaysStartsFromZero ?
      [0, max(pointsWithinMonthDomain, d => d.value)] :
      extent(pointsWithinMonthDomain, d => d.value);

    const valueScale = scaleLinear()
      .range([style.height, 0])
      .domain(valueScaleDomain)
      .nice(5);

    const sliderValueScale = scaleLinear()
      .range([style.sliderHeight, 0])
      .domain([0, max(allPoints, d => d.value)])
      .nice(5);

    this.scales = {
      month: monthScale,
      value: valueScale,
      dayLabels: dayLabelsScale,
      week: weekScale,
      sliderMonth: sliderMonthScale,
      sliderValue: sliderValueScale
    };

    this.cd.detectChanges();
  }

  get maxDate() {
    return max(
      this.data.reduce((acc, dataItem) => {
        return [...acc, ...dataItem.points.map(point => new Date(point.date))];
      }, [])
    );
  }
}
