import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { timeDay } from 'd3-time';
import { compareDesc, format, isAfter, isBefore, isValid, parse, subDays } from 'date-fns/esm';

const isDayBefore = (date, dateToCompare) => isBefore(timeDay.floor(date), timeDay.floor(dateToCompare));
const isDayAfter = (date, dateToCompare) => isAfter(timeDay.floor(date), timeDay.floor(dateToCompare));

const formatString = 'dd.MM.yyyy';

@Component({
  selector: 'app-date-range-input',
  templateUrl: './date-range-input.component.html',
  styleUrls: ['./date-range-input.component.css']
})
export class DateRangeInputComponent {
  @Output() selectedRangeChange = new EventEmitter();
  @Output() showCalendar = new EventEmitter();
  @Input() availableRange: Date[];
  startDateString = format(subDays(new Date(), 1), formatString);
  endDateString = format(new Date(), formatString);

  get startDate() {
    return parse(this.startDateString, formatString, new Date());
  }

  get endDate() {
    return parse(this.endDateString, formatString, new Date());
  }

  @HostBinding('class.app-date-range-input_error')
  get isError() {
    let condition = compareDesc(this.startDate, this.endDate) < 0;

    if (this.availableRange) {
      condition = condition ||
        isDayBefore(this.startDate, this.availableRange[0]) ||
        isDayAfter(this.endDate, this.availableRange[1]);
    }

    return condition;
  }

  @Input()
  set selectedRange(range: Date[]) {
    const [start, end] = range;
    this.startDateString = format(start, formatString);
    this.endDateString = format(end, formatString);
  }

  validateAndEmit() {
    if (isValid(this.startDate) && isValid(this.endDate)) {
      this.selectedRangeChange.emit([this.startDate, this.endDate]);
    }
  }
}
