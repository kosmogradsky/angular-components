import { NgModule } from '@angular/core';
import { RiftModule } from 'angular-rift';
import { SharedModule } from 'shared';

import { ChartCommonModule } from '../chart-common/chart-common.module';

import { VbarChartBarComponent } from './vbar-chart-bar/vbar-chart-bar.component';
import { VbarChartGroupComponent } from './vbar-chart-group/vbar-chart-group.component';
import { VbarChartLegendComponent } from './vbar-chart-legend/vbar-chart-legend.component';
import { VbarChartMainComponent } from './vbar-chart-main/vbar-chart-main.component';
import { VbarChartTickComponent } from './vbar-chart-tick/vbar-chart-tick.component';
import { VbarChartComponent } from './vbar-chart.component';

@NgModule({
  imports: [
    SharedModule,
    ChartCommonModule,
    RiftModule
  ],
  declarations: [
    VbarChartComponent,
    VbarChartLegendComponent,
    VbarChartGroupComponent,
    VbarChartBarComponent,
    VbarChartMainComponent,
    VbarChartTickComponent
  ],
  exports: [
    VbarChartComponent,
    VbarChartLegendComponent,
    VbarChartGroupComponent,
    VbarChartBarComponent,
    VbarChartMainComponent,
    VbarChartTickComponent
  ]
})

export class VbarChartModule {
}
