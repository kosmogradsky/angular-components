import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { timeMonth, timeYear, CountableTimeInterval } from 'd3-time';

import { Detalizations } from '../../constants';
import { LineChartSliderHandleComponent } from '../line-chart-slider-handle/line-chart-slider-handle.component';
import { style, LineChartDatum } from '../line-chart.component';

@Component({
  selector: 'app-line-chart-slider',
  templateUrl: './line-chart-slider.component.html',
  styleUrls: ['./line-chart-slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartSliderComponent {
  style = style;
  @Input() data: LineChartDatum[];
  @Input() monthScale: ScaleTime<number, number>;
  @Input() valueScale: ScaleLinear<number, number>;
  @Input() highlightedIndex: number = null;
  @Input() selectedDomain: Date[];
  @Input() timeFunc: CountableTimeInterval = timeMonth;
  @Input() detalization: Detalizations;
  @Output() selectedDomainChange = new EventEmitter<Date[]>();
  @ViewChild('leftHandle') leftHandle: LineChartSliderHandleComponent;
  @ViewChild('rightHandle') rightHandle: LineChartSliderHandleComponent;

  get selectedRange() {
    return this.selectedDomain.map(boundary => this.monthScale(boundary));
  }

  get leftAllowedRange() {
    const currentRightHandleDate = this.selectedDomain[1];
    const oneMonthBackFromRightHandleDate = timeMonth.offset(currentRightHandleDate, -1);
    const rightBoundary = this.monthScale(oneMonthBackFromRightHandleDate);

    return [this.monthScale.range()[0], rightBoundary];
  }

  get rightAllowedRange() {
    const currentLeftHandleDate = this.selectedDomain[0];
    const oneMonthForwardFromRightHandleDate = timeMonth.offset(currentLeftHandleDate, 1);
    const leftBoundary = this.monthScale(oneMonthForwardFromRightHandleDate);

    return [leftBoundary, this.monthScale.range()[1]];
  }

  get ticks() {
    const domain = this.monthScale.domain();

    return timeYear.range(domain[0], domain[1]);
  }

  constructor(
    public lineChartSliderRef: ElementRef,
    public host: ElementRef
  ) { }

  setSelectedRangeBoundary(index: number, newBoundary: number) {
    const newSelectedDomain = this.selectedDomain.slice();
    newSelectedDomain[index] = this.monthScale.invert(newBoundary);

    this.selectedDomainChange.emit(newSelectedDomain);
  }

}
