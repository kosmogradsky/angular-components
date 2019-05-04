import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { format } from 'd3-format';
import isNil from 'ramda/src/isNil';
import { filter, map } from 'rxjs/internal/operators';

import { margin, ChartBar, Tooltip, VbarChartDatum, VbarChartService, VBarState } from '../vbar-chart.service';

@Component({
  selector: 'app-vbar-chart-main',
  templateUrl: './vbar-chart-main.component.html',
  styleUrls: ['./vbar-chart-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VbarChartMainComponent implements AfterViewInit, OnChanges {
  @Input() data: Array<VbarChartDatum>;
  @Input() groupName: string;
  @Input() height: number;
  @Input() hasLegend: boolean;
  @ViewChild('chart') chart: ElementRef;
  @Output() tooltipPosition = new EventEmitter<Tooltip>();
  @Output() tooltipValues = new EventEmitter<ChartBar[]>();
  margin = margin;
  activeColor = this.chartService.store.state.pipe(map(state => state.activeColor));
  groupValue = this.chartService.store.state.pipe(
    filter(state => !isNil(state.groupValues)),
    map((state: VBarState) => {
      const group = state.groupValues.filter(value => value.group === this.groupName)[0];
      return group.value ? format('.0%')(group.value) : '';
    }));

  get chartHeight() {
    return `${this.height + margin.top + margin.bottom}px`;
  }

  constructor(public chartService: VbarChartService,
              private cdr: ChangeDetectorRef) {
  }

  render() {
    this.chartService.update(
      560,
      this.height || this.chart.nativeElement.clientHeight - margin.top - margin.bottom);
  }

  exitTooltipMode() {
    this.tooltipPosition.emit(null);
    this.chartService.setActiveGroup('');
    this.chartService.setActiveSubgroup('');
  }

  changePosition(event: MouseEvent) {
    this.tooltipPosition.emit({ top: event.clientY, left: event.clientX, reverse: event.clientY > window.innerHeight / 2});
  }

  ngAfterViewInit() {
    this.render();
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.isFirstChange()) {
      this.render();
    }
  }
}
