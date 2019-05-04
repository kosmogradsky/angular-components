import { NgModule } from '@angular/core';

import { SharedModule } from 'shared';
import { ChartCommonModule } from '../chart-common/chart-common.module';

import { LineChartCursorComponent } from './line-chart-cursor/line-chart-cursor.component';
import { LineChartLegendComponent } from './line-chart-legend/line-chart-legend.component';
import { LineChartLineComponent } from './line-chart-line/line-chart-line.component';
import { LineChartMainComponent } from './line-chart-main/line-chart-main.component';
import { LineChartSliderHandleComponent } from './line-chart-slider-handle/line-chart-slider-handle.component';
import { LineChartSliderComponent } from './line-chart-slider/line-chart-slider.component';
import { LineChartComponent } from './line-chart.component';

@NgModule({
  imports: [
    SharedModule,
    ChartCommonModule
  ],
  declarations: [
    LineChartComponent,
    LineChartLineComponent,
    LineChartSliderComponent,
    LineChartSliderHandleComponent,
    LineChartMainComponent,
    LineChartLegendComponent,
    LineChartCursorComponent
  ],
  exports: [
    LineChartComponent
  ]
})
export class LineChartModule { }
