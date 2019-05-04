import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs/internal/operators';

import { ChartBar, VbarChartService } from '../vbar-chart.service';

@Component({
  selector: 'app-vbar-chart-legend',
  templateUrl: './vbar-chart-legend.component.html',
  styleUrls: ['./vbar-chart-legend.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VbarChartLegendComponent {
  @Input() data: Array<ChartBar>;
  currentKey = this.chartService.store.state.pipe(map(state => state.activeKey));

  constructor(public chartService: VbarChartService) {}

  mouseLeave() {
    this.chartService.setActiveKey('', '');
  }

  mouseEnter(key: string, color: string) {
    this.chartService.setActiveKey(key, color);
  }

  opacityItem(currentKey: string, key: string) {
    return currentKey === key || !currentKey  ? 1 : 0.1;
  }
}
