import { NgModule } from '@angular/core';

import { ChartCommonModule } from './chart-common/chart-common.module';
import { DonutChartModule } from './donut-chart/donut-chart.module';
import { HbarChartModule } from './hbar-chart/hbar-chart.module';
import { LineChartModule } from './line-chart/line-chart.module';
import { VbarChartModule } from './vbar-chart/vbar-chart.module';

@NgModule({
  imports: [
    ChartCommonModule,
    DonutChartModule,
    HbarChartModule,
    LineChartModule,
    VbarChartModule
  ],
  exports: [
    DonutChartModule,
    HbarChartModule,
    LineChartModule,
    VbarChartModule,
    ChartCommonModule
  ]
})
export class ChartsModule { }
