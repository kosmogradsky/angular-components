import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { RiftModule } from 'angular-rift';
import { SharedModule } from 'shared';

import { ChartCommonModule } from '../chart-common/chart-common.module';

import { HbarChartMinimapComponent } from './hbar-chart-minimap/hbar-chart-minimap.component';
import { HbarChartScrollContainerComponent } from './hbar-chart-scroll-container/hbar-chart-scroll-container.component';
import { HbarChartComponent } from './hbar-chart.component';
import { HsegChartSegmentComponent } from './hseg-chart-segment/hseg-chart-segment.component';
import { HsegChartComponent } from './hseg-chart/hseg-chart.component';

@NgModule({
  imports: [
    SharedModule,
    ChartCommonModule,
    RiftModule,
    ScrollingModule
  ],
  declarations: [
    HbarChartComponent,
    HsegChartComponent,
    HbarChartMinimapComponent,
    HbarChartScrollContainerComponent,
    HsegChartSegmentComponent
  ],
  exports: [
    HbarChartComponent,
    HsegChartComponent
  ]
})
export class HbarChartModule { }
