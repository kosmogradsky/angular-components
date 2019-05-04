import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { max, sum } from 'd3-array';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { Dictionary } from 'lodash';

import { Statistics, STATISTIC_TITLES } from '../../constants';

export interface HsegChartItemValue {
  value: number;
  inaccurate: boolean;
}

export interface HsegChartData {
  groups: Dictionary<{
    id: number;
    name: string;
    color: string;
  }>;
  items: {
    name: string;
    id: number;
    values: Dictionary<HsegChartItemValue>;
  }[];
}

export const style = {
  height: 305,
  width: 600,
  segHeight: 15,
  segPaddingRight: 5,
  rowPaddingTop: 36,
  rowOffsetLeft: 200,
  obscuredOpacity: .1,
  get rowOffsetHeight() {
    return this.segHeight + this.rowPaddingTop;
  }
};

@Component({
  selector: 'app-hseg-chart',
  templateUrl: './hseg-chart.component.html',
  styleUrls: ['./hseg-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HsegChartComponent implements OnChanges {
  @ViewChild('scrollContainer') scrollContainer: CdkVirtualScrollViewport;
  @Input() data: HsegChartData = {
    items: [],
    groups: {}
  };
  @Input() statistic: Statistics;
  minimapData: Array<{ value: number }>;
  style = style;
  scale: ScaleLinear<number, number>;
  highlightedGroupId: number = null;
  highlightedItemIndex: number = null;
  tooltipPosition: [number, number, boolean];
  statisticTitle: string;

  get scrollHeight() {
    return style.rowOffsetHeight * this.data.items.length;
  }

  setHighlightedGroup(index: number) {
    this.highlightedGroupId = index;
  }

  setHighlightedItem(index: number, event?: MouseEvent) {
    this.highlightedItemIndex = index;
    this.statisticTitle = STATISTIC_TITLES[this.statistic];

    if (event) {
      this.setTooltipPosition(event);
    }
  }

  setTooltipPosition(event: MouseEvent) {
    this.tooltipPosition = [event.clientX, event.clientY, event.clientY > window.innerHeight / 2];
  }

  isObscuredGroup(index: number) {
    return this.highlightedGroupId !== null && this.highlightedGroupId !== index;
  }

  isObscuredItem(index: number) {
    return this.highlightedItemIndex !== null && this.highlightedItemIndex !== index;
  }

  ngOnChanges() {
    this.minimapData = this.data.items.map(item => ({
      value: sum(Object.values(item.values).map((valueItem: HsegChartItemValue) => valueItem.value))
    }));

    this.scale = scaleLinear()
      .domain([0, max(this.data.items, (item) =>
        sum(Object.values(item.values).map((valueItem: HsegChartItemValue)  => valueItem.value)))])
      .range([0, 400 - (Object.keys(this.data.groups).length - 1) * style.segPaddingRight] as ReadonlyArray<number>);
  }
}
