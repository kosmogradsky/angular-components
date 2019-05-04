import { Component, Input } from '@angular/core';
import { PieArcDatum } from 'd3-shape';
import groupBy from 'ramda/src/groupBy';
import { map } from 'rxjs/internal/operators';

import { DonutChartDatum, DonutChartService } from '../donut-chart.service';

@Component({
  selector: 'app-donut-legend',
  templateUrl: './donut-legend.component.html',
  styleUrls: ['./donut-legend.component.css']
})

export class DonutLegendComponent {
  @Input() groupField: string;
  @Input() pieData: Array<PieArcDatum<DonutChartDatum>>;
  currentSectorIndex = this.donutChartService.store.state
    .pipe(map(state => state.currentSectorIndex));

  get groups() {
    return groupBy(value => this.groupField ? value.data.group : '', this.pieData);
  }

  constructor(private donutChartService: DonutChartService) {
  }

  mouseLeave() {
    this.donutChartService.clearSectorState();
    this.donutChartService.destroyTooltip();
  }

  setTooltipCoordinates(event: MouseEvent) {
    this.donutChartService.setTooltipCoordinates(event.clientX, event.clientY, false);
  }

  mouseEnter(event: MouseEvent, datum: PieArcDatum<DonutChartDatum>) {
    this.donutChartService.setActiveSectorState(datum.index);
    this.setTooltipCoordinates(event);
  }

  opacityItem(currentIndex: number, index: number) {
    return currentIndex === index || currentIndex === null ? 1 : 0.1;
  }

  opacityGroup(currentIndex: number, group: string) {
    const hasGroup = this.pieData.some(item => item.data.group === group && item.index === currentIndex);
    return hasGroup || currentIndex === null ? 1 : 0.1;
  }
}
