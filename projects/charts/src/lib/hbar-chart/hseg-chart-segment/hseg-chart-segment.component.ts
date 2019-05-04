import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import { style } from '../hseg-chart/hseg-chart.component';

@Component({
  selector: 'app-hseg-chart-segment',
  templateUrl: './hseg-chart-segment.component.html',
  styleUrls: ['./hseg-chart-segment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HsegChartSegmentComponent {
  @Input() width: number;
  @Input() value: number;
  @Input() fill: string;
  @Input() focused: boolean;
  @Input() innacurate: boolean;
  @Input() obscured: boolean;
  @Input() inaccurate: boolean;

  @HostBinding('style.width.px')
  get correctedWidth() {
    return this.width < 1 ? 1 : this.width;
  }

  @HostBinding('attr.opacity')
  get opacity() {
    return this.obscured ? style.obscuredOpacity : 1;
  }
}
