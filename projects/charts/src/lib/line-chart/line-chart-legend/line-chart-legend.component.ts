import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { style, LineChartDatum } from '../line-chart.component';

@Component({
  selector: 'app-line-chart-legend',
  templateUrl: './line-chart-legend.component.html',
  styleUrls: ['./line-chart-legend.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartLegendComponent implements OnInit {
  style = style;
  @Input() data: LineChartDatum[];
  @Input() highlightedIndex: number;
  @Output() highlightedIndexChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
