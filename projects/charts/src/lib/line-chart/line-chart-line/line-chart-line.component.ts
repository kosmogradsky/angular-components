import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { LineChartDatum } from '../line-chart.component';

@Component({
  selector: '[appLineChartLine]', // tslint:disable-line component-selector
  templateUrl: './line-chart-line.component.html',
  styleUrls: ['./line-chart-line.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartLineComponent implements OnInit {
  @Input('appLineChartLine') line: LineChartDatum; // tslint:disable-line no-input-rename
  @Input() index: number;
  @Input() xScale: any;
  @Input() yScale: any;
  @Input() obscured: boolean;
  @Input() weight = 1;

  constructor() { }

  ngOnInit() {
  }

}
