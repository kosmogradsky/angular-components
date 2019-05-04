import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { timeDay, timeMonth, timeWeek } from 'd3-time';
import {
  addDays,
  addMonths,
  addWeeks,
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  subDays,
} from 'date-fns/esm';
import { max } from 'lodash-es';

import { Detalizations, Statistics } from '../../constants';
import { style, LineChartDatum } from '../line-chart.component';

const numberOfTicks = 5;
const numberOfWeekTicks = 4;

@Component({
  selector: 'app-line-chart-main',
  templateUrl: './line-chart-main.component.html',
  styleUrls: ['./line-chart-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartMainComponent {
  style = style;
  @Input() tooltipAlwaysVisible: boolean;
  @Input() monthScale: ScaleTime<number, number>;
  @Input() weekScale: ScaleTime<number, number>;
  @Input() valueScale: ScaleLinear<number, number>;
  @Input() dayLabelsScale: ScaleTime<number, number>;
  @Input() data: LineChartDatum[];
  @Input() detalization: Detalizations;
  @Input() statistic: Statistics;
  @Input() highlightedIndex: number = null;

  get monthScaleLabels() {
    const [fromDate, toDate] = this.monthScale.domain();
    const step = Math.max(1, Math.round(differenceInMonths(toDate, fromDate) / numberOfTicks));
    const range = timeMonth.range(addMonths(fromDate, 1), addMonths(toDate, 1), step);

    return [...range.slice(0, range.length - 1), toDate];
  }

  get weekScaleLabels() {
    const [fromDate, toDate] = this.weekScale.domain();
    const step = Math.max(1, Math.round(differenceInWeeks(toDate, fromDate) / numberOfWeekTicks));
    const range = timeWeek.range(fromDate, toDate, step).map(date => addDays(date, 1));

    return [...range.slice(0, range.length - 1), toDate];
  }

  get dayScaleLabels() {
    const [fromDate, toDate] = this.monthScale.domain();
    const step = Math.max(1, Math.round(differenceInDays(toDate, fromDate) / numberOfTicks));
    const range = timeDay.range(addDays(fromDate, 1), addDays(toDate <= this.maxDate ? toDate : this.maxDate, 1), step);

    return [...range.slice(0, range.length - 1), toDate];
  }

  get monthScaleTicks() {
    const [fromDate, toDate] = this.monthScale.domain();

    return timeMonth.range(fromDate, addMonths(toDate, 1));
  }

  get weekScaleTicks() {
    const [fromDate, toDate] = this.weekScale.domain();

    return timeWeek.range(fromDate, addWeeks(toDate, 1)).map(
      date => subDays(date, 6)
    );
  }

  get dayScaleTicks() {
    const [fromDate] = this.monthScale.domain();

    return timeDay.range(fromDate, addDays(this.maxDate, 1)).filter(tick => {
      return this.monthScale(tick) <= this.style.width;
    });
  }

  get ticks() {
    switch (this.detalization) {
      case Detalizations.Month: {
        return this.monthScaleTicks;
      }

      case Detalizations.Week: {
        return this.weekScaleTicks;
      }

      case Detalizations.Day: {
        return this.dayScaleTicks;
      }

      default: {
        return this.monthScaleTicks;
      }
    }
  }

  ticksAmountBetween(start: number, end: number) {
    return this.ticks.length >= start && this.ticks.length < end;
  }

  get scaleLabels() {
    switch (this.detalization) {
      case Detalizations.Month: {
        return this.monthScaleLabels;
      }

      case Detalizations.Week: {
        return this.weekScaleLabels;
      }

      case Detalizations.Day: {
        return this.dayScaleLabels;
      }

      default: {
        return this.monthScaleLabels;
      }
    }
  }

  get maxDate() {
    return max(
      this.data.reduce((acc, dataItem) => {
        return [...acc, ...dataItem.points.map(point => new Date(point.date))];
      }, [])
    );
  }

  get singlePointLines() {
    return this.data.map((item, index) => ({ ...item, index })).filter(
      item => item.points.filter(
        point => this.filterPointInDomain(point)
      ).length === 1
    ).map(
      data => (
        {
          ...data,
          points: data.points.filter(point => this.filterPointInDomain(point))
        }
      )
    );
  }

  get multiplePointsLines() {
    return this.data.map((item, index) => ({ ...item, index })).filter(item => item.points.length !== 1);
  }

  private filterPointInDomain(point) {
    const scale = this.detalization === Detalizations.Week ? this.weekScale : this.monthScale;
    const [fromDate, toDate] = scale.domain();

    return new Date(point.date) >= fromDate && new Date(point.date) <= toDate;
  }
}
