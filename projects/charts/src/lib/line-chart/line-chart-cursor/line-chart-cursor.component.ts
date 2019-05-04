import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { ContainerElement } from 'd3-selection';
import { timeDay, timeMonth, timeWeek } from 'd3-time';
import { addDays } from 'date-fns/esm';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, exhaustMap, finalize, map } from 'rxjs/operators';

import { Detalizations, Statistics, STATISTIC_TITLES } from '../../constants';
import {
  positionOnMove,
  MoveAxis,
  formatDay,
  formatMonth,
  weekFirstDay,
  weekLastDay
} from 'utils';
import { style, LineChartDatum, LineChartPoint } from '../line-chart.component';

interface LineChartCursorDatum {
  id: number;
  name: string;
  color: string;
  points: {
    [date: number]: LineChartPoint
  };
}

const tooltipStyle = {
  width: 270,
  marginLeft: 20
};

@Component({
  selector: '[appLineChartCursor]', // tslint:disable-line component-selector
  templateUrl: './line-chart-cursor.component.html',
  styleUrls: ['./line-chart-cursor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  style = style;
  @HostBinding('style.visibility') visibility = 'hidden';
  @ViewChild('tooltip') tooltip: TemplateRef<any>;
  @Input() statistic: Statistics;
  @Input() container: ContainerElement;
  @Input() monthScale: ScaleTime<number, number>;
  @Input() detalization: Detalizations;
  @Input() valueScale: ScaleLinear<number, number>;
  @Input() tooltipAlwaysVisible: boolean;

  _data: LineChartCursorDatum[];
  @Input()
  set data(data: LineChartDatum[]) {
    this._data = data.map(datum => ({
      id: datum.id,
      name: datum.name,
      color: datum.color,
      points: datum.points.reduce((acc, point) => {
        const flooredDate = this.detalization === Detalizations.Week
          ? addDays(this.timeRange.floor(new Date(point.date)), 1).valueOf()
          : this.timeRange.floor(new Date(point.date)).valueOf();
        acc[flooredDate] = point;

        return acc;
      }, {})
    }));
  }

  date = 0;
  translate = 0;
  tooltipTranslate = 0;
  points: {
    name: string;
    color: string;
    inaccurate: boolean;
    date: number;
    value: number
  }[] = [];
  move: Subscription;
  statisticTitle: string;

  get timeRange() {
    switch (this.detalization) {
      case Detalizations.Day: {
        return timeDay;
      }

      case Detalizations.Week: {
        return timeWeek;
      }

      case Detalizations.Month: {
        return timeMonth;
      }
    }
  }

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.move = fromEvent(this.container, 'mouseenter').pipe(
      exhaustMap(() => {
        this.visibility = 'visible';

        return positionOnMove({
          axis: MoveAxis.Horizontal,
          container: this.container,
          takeUntil: fromEvent(this.container, 'mouseleave')
        }).pipe(
          map(position => {
            const date = this.monthScale.invert(position);
            const roundedDate = this.detalization === Detalizations.Week
              ? addDays(this.timeRange.round(date), 1)
              : this.timeRange.round(date);

            return roundedDate.valueOf();
          }),
          distinctUntilChanged(),
          finalize(() => {
            this.visibility = 'hidden';
            this.cd.markForCheck();
          })
        );
      })
    ).subscribe(date => {
      this.date = date;
      this.statisticTitle = STATISTIC_TITLES[this.statistic];
      this.translate = this.monthScale(date);
      this.computePoints();
      this.computeTooltip();
      this.cd.markForCheck();
    });
  }

  computePoints() {
    this.points = this._data
      .filter(datum => datum.points[this.date])
      .map(datum => {
        const point = datum.points[this.date];

        return {
          id: datum.id,
          name: datum.name,
          color: datum.color,
          inaccurate: point.inaccurate,
          date: point.date,
          value: point.value
        };
      })
      .sort((a, b) => a.id - b.id);
  }

  computeTooltip() {
    const correctedTranslate = this.translate + tooltipStyle.width > style.width ?
      this.translate - tooltipStyle.width - tooltipStyle.marginLeft :
      this.translate + tooltipStyle.marginLeft;

    this.tooltipTranslate = correctedTranslate + style.margin.left;
  }

  ngOnDestroy() {
    this.move.unsubscribe();
  }

  getDateFormated(dateAsNumber: number) {
    const date = new Date(dateAsNumber);
    switch (this.detalization) {
      case Detalizations.Day: {
        return formatDay(date);
      }

      case Detalizations.Week: {
        const first = weekFirstDay(date);
        const last = weekLastDay(date);
        return `${first}-${last}`;
      }

      case Detalizations.Month: {
        return formatMonth(date);
      }
    }
  }

}
