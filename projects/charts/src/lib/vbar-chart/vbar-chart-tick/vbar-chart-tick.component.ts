import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { VbarChartService } from '../vbar-chart.service';

@Component({
  selector: '[appVbarChartTick]', // tslint:disable-line component-selector
  templateUrl: './vbar-chart-tick.component.html',
  styleUrls: ['./vbar-chart-tick.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VbarChartTickComponent {
  @Input() value: string;
  @Input() isAxisY: boolean;
  @Input() isShowText = true;

  constructor(public chartService: VbarChartService) {}
}
