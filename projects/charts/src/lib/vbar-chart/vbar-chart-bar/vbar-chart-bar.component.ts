import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import isNil from 'ramda/src/isNil';
import { filter, map } from 'rxjs/internal/operators';

import { ChartBar, VbarChartService } from '../vbar-chart.service';

interface RectParameters {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  fill: string;
}

@Component({
  selector: '[appVbarChartBar]', // tslint:disable-line component-selector
  templateUrl: './vbar-chart-bar.component.html',
  styleUrls: ['./vbar-chart-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VbarChartBarComponent {
  @Input() data: ChartBar;
  rectProperties = this.chartService.store.state
    .pipe(
      filter(state => !isNil(state.chartSize)),
      map(state => <RectParameters>{
          x: this.chartService.groupScale(this.data.key),
          y: this.chartService.yScale(this.data.value),
          width: this.chartService.groupScale.bandwidth(),
          height: state.chartSize.height - this.chartService.yScale(this.data.value),
          fill: this.data.color
        }));


  focused = this.chartService.store.state.pipe(map(state => state.activeKey === this.data.key));
  opacity = this.chartService.store.state.pipe(map(state => (this.data.key === state.activeKey || !state.activeKey) ? 1 : 0.1));

  get value(): string {
    return this.data.inaccurate ? '**' : this.chartService.format(this.data.value);
  }

  constructor(private chartService: VbarChartService) {
  }
}
