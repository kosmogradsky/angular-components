import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { VbarChartDatum, VbarChartService } from '../vbar-chart.service';

@Component({
  selector: '[appVbarChartGroup]', // tslint:disable-line component-selector
  templateUrl: './vbar-chart-group.component.html',
  styleUrls: ['./vbar-chart-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class VbarChartGroupComponent implements OnInit, OnDestroy {
  @HostBinding('attr.opacity') opacity = 1;
  opacitySubscription: Subscription;

  @Input() data: VbarChartDatum;
  @Input() color: string;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.chartService.setActiveSubgroup(this.data.key);
    this.chartService.setActiveGroup(this.data.group);
  }

  ngOnInit() {
    this.opacitySubscription = this.chartService.store.state.subscribe(state => {
      const isActive = state.activeSubgroup === this.data.key && state.activeGroup === this.data.group;
      this.opacity = isActive || !state.activeSubgroup ? 1 : 0.1;
    });
  }

  ngOnDestroy() {
    this.opacitySubscription.unsubscribe();
  }

  constructor(
    public chartService: VbarChartService
  ) {
  }
}
