import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { getDaysInMonth, isMonday, setDate } from 'date-fns/esm';
import compose from 'ramda/src/compose';
import reduce from 'ramda/src/reduce';
import times from 'ramda/src/times';

const getWeeksOfMonth = (monthTimestamp: number): Date[][] => compose(
  reduce((weeks: Date[][], day: Date) => {
    if (isMonday(day) || weeks.length === 0) {
      weeks.push([]);
    }

    weeks[weeks.length - 1].push(day);
    return weeks;
  }, []),
  times((index) => setDate(monthTimestamp, index + 1)),
  getDaysInMonth
)(monthTimestamp);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  @Input() monthTimestamp = Date.now();
  @Input() selectedRange: number[] = [];
  @Output() monthClick = new EventEmitter<number>();
  @ViewChild('monthRef') monthRef: ElementRef;
  weekdayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  get month() {
    return getWeeksOfMonth(this.monthTimestamp);
  }

  constructor() { }

  trackWeek(index: number) {
    return `${this.monthTimestamp}_${index}`;
  }

  trackDay(_, day: Date) {
    return day.valueOf();
  }

}
