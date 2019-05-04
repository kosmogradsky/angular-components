import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-chart-tooltip',
  templateUrl: './chart-tooltip.component.html',
  styleUrls: ['./chart-tooltip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartTooltipComponent {
  @Input() leftTitle: string;
  @Input() rightTitle: string;
}
