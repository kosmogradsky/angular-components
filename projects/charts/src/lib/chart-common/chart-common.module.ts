import { NgModule } from '@angular/core';

import { SharedModule } from 'shared';

import { ChartDropdownToolsDirective } from './chart-dropdown-tools.directive';
import { ChartDropdownComponent } from './chart-dropdown/chart-dropdown.component';
import { ChartLegendItemComponent } from './chart-legend-item/chart-legend-item.component';
import { ChartTooltipComponent } from './chart-tooltip/chart-tooltip.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ChartTooltipComponent,
    ChartLegendItemComponent,
    ChartDropdownComponent,
    ChartDropdownToolsDirective
  ],
  exports: [
    ChartTooltipComponent,
    ChartLegendItemComponent,
    ChartDropdownComponent,
    ChartDropdownToolsDirective
  ]
})
export class ChartCommonModule { }
