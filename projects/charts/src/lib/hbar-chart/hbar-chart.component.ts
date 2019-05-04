import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Statistics, ValueType } from '../constants';

export interface HbarChartDatum {
  id: number;
  name: string;
  value: number;
  inaccurate?: boolean;
}

const style = {
  rowPaddingTop: 11,
  rowPaddingBottom: 12,
  barHeight: 10,
  barMaxWidth: 284,
  focusedColor: '#5A6B8C',
  get rowOffsetHeight() {
    return this.barHeight + this.rowPaddingTop + this.rowPaddingBottom;
  }
};

@Component({
  selector: 'app-hbar-chart',
  templateUrl: './hbar-chart.component.html',
  styleUrls: ['./hbar-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HbarChartComponent implements AfterViewInit {
  style = style;
  @ViewChild('scrollContainer') scrollContainer: CdkVirtualScrollViewport;
  @Input() valueType: ValueType;
  @Input() statistic: Statistics;
  @Input() barsHaveBackgrounds = true;
  @Input() color = '#13D4BC';
  @Input() width = 628;
  @Input() height = 331;
  @Input() focusedId: number;
  @Input() data: HbarChartDatum[] = [];

  get digitsCount() {
    return this.valueType === ValueType.Absolute || this.statistic === Statistics.Quantity ? 0 : 1;
  }

  get scale() {
    return scaleLinear()
      .range([0, style.barMaxWidth])
      .domain([0, max(this.data, datum => datum.value)]);
  }

  get focusedIndex() {
    return this.data.findIndex(value => value.id === this.focusedId);
  }

  constructor() {
  }

  ngAfterViewInit() {
    if (this.focusedIndex && this.data.length) {
      setTimeout(() => this.scrollContainer.scrollToIndex(this.focusedIndex - 4));
    }
  }

}
