import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import groupBy from 'ramda/src/groupBy';
import { map } from 'rxjs/internal/operators';

import { Statistics } from '../constants';

import { ChartBar, Tooltip, VbarChartDatum, VbarChartService } from './vbar-chart.service';

@Component({
  selector: 'app-vbar-chart',
  templateUrl: './vbar-chart.component.html',
  styleUrls: ['./vbar-chart.component.css'],
  providers: [VbarChartService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VbarChartComponent implements OnInit, OnChanges {
  @Input() height: number;
  @Input() groupField: string;
  @Input() data: Array<VbarChartDatum>;
  @Input() statistic: Statistics;
  tooltipPosition: Tooltip = null;
  tooltipValues: ChartBar[] = [];
  groups: Array<any> = [];
  activeGroup = this.chartService.store.state
    .pipe(map(state => state.activeGroup || ''));
  activeSubgroup = this.chartService.store.state
    .pipe(map(state => state.activeSubgroup));

  constructor(public chartService: VbarChartService) {
  }

  ngOnChanges() {
    this.chartService.data = this.data;
    this.chartService.statistic = this.statistic;
    const groupValues = groupBy(value => this.groupField ? value[this.groupField] : '', this.data);

    Object.keys(groupValues).forEach(key => {
      this.groups[key] = groupValues[key].map(group => ({
        ...group,
        values: group.values.sort((a, b) => a.id - b.id)
      }));
    });
  }

  ngOnInit() {
    this.chartService.groupField = this.groupField;
  }
}
