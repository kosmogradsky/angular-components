import { NgModule } from '@angular/core';
import { RiftModule } from 'angular-rift';
import { SharedModule } from 'shared';

import { ChartCommonModule } from '../chart-common/chart-common.module';

import { DonutChartComponent } from './donut-chart.component';
import { DonutLegendComponent } from './donut-legend/donut-legend.component';
import { DonutSectorComponent } from './donut-sector/donut-sector.component';

@NgModule({
  imports: [
    SharedModule,
    ChartCommonModule,
    RiftModule
  ],
  declarations: [
    DonutChartComponent,
    DonutSectorComponent,
    DonutLegendComponent
  ],
  exports: [
    DonutChartComponent,
    DonutSectorComponent,
    DonutLegendComponent
  ]
})

export class DonutChartModule {
}
