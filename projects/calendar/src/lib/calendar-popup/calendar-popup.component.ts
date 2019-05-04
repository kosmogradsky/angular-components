import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import { timeMonth } from 'd3-time';
import { addMonths } from 'date-fns/esm';
import { getDaysInMonth, setDate } from 'date-fns/esm';
import { fromEvent, interval, Subscription, } from 'rxjs';
import { exhaustMap, map, startWith, takeUntil } from 'rxjs/operators';

import { fromClickOutside } from 'utils';
import { CalendarTimelineComponent } from '../calendar-timeline/calendar-timeline.component';
import { CalendarComponent } from '../calendar.component';

const extractDate = (event: Event) => parseInt((<HTMLElement>event.target).dataset.date, 10);

@Component({
  selector: 'app-calendar-popup',
  templateUrl: './calendar-popup.component.html',
  styleUrls: ['./calendar-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPopupComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('timeline') timeline: CalendarTimelineComponent;
  @ViewChildren(CalendarComponent, { read: ElementRef }) calendars: QueryList<ElementRef>;
  @Input() availableRange = [new Date(), addMonths(Date.now(), 28)];
  @Input() selectedRange: Date[] = [];
  @Output() selectedRangeChange = new EventEmitter<number[]>();
  @Output() close = new EventEmitter();
  selectingRangeSubscription: Subscription;
  scrollRangeSubscription: Subscription;
  scrollEnterSubscription: Subscription;
  scrollLeaveSubscription: Subscription;
  closePopupSubscription: Subscription;
  availableMonths: Date[] = [];
  currentMonthIndex: number;

  constructor(
    private host: ElementRef<HTMLElement>,
    private cd: ChangeDetectorRef
  ) {
  }

  get transform() {
    return { transform: `translateX(${-240 * this.currentMonthIndex}px)` };
  }

  ngOnInit() {
    const startingOffset = timeMonth.floor(this.selectedRange[0]);
    this.availableMonths = timeMonth.range(timeMonth.floor(this.availableRange[0]), this.availableRange[1]);
    this.applyOffset(startingOffset);

    const leftScroll = this.host.nativeElement.querySelector('.left-scroll');
    const rightScroll = this.host.nativeElement.querySelector('.right-scroll');

    const elements = [this.host.nativeElement, document.body.querySelector<HTMLElement>('.calendar-button')];
    this.closePopupSubscription = fromClickOutside(elements, true).subscribe(() => this.close.emit());

    this.scrollEnterSubscription = fromEvent([leftScroll, rightScroll], 'mouseenter')
      .subscribe((event: MouseEvent) => {
        const currentTarget = event.currentTarget;
        this.scrollRangeSubscription = interval(750).subscribe(() => {
          let newDiff: number;

          console.log(this.currentMonthIndex);
          if (currentTarget === leftScroll) {
            newDiff = -1;
            if (this.currentMonthIndex === 0) {
              return;
            }
          } else {
            newDiff = 1;
            if (this.currentMonthIndex === this.availableMonths.length - 4) {
              return;
            }
          }

          this.currentMonthIndex = this.currentMonthIndex + newDiff;
          this.timeline.changeCursorTranslate(this.availableMonths[this.currentMonthIndex]);
          this.cd.markForCheck();
        });
      });

    this.scrollLeaveSubscription = fromEvent([leftScroll, rightScroll], 'mouseleave')
      .subscribe(() => {
        this.scrollRangeSubscription.unsubscribe();
      });
  }

  ngAfterViewInit() {
    this.subscribeForRangeSelecting();
  }

  ngOnDestroy() {
    this.selectingRangeSubscription.unsubscribe();
    this.scrollLeaveSubscription.unsubscribe();
    this.scrollEnterSubscription.unsubscribe();
    this.closePopupSubscription.unsubscribe();
  }

  subscribeForRangeSelecting() {
    const days = this.host.nativeElement.querySelectorAll('.day');
    const dayClick = fromEvent(days, 'click');
    const dayMouseEnter = fromEvent(days, 'mouseenter');

    this.selectingRangeSubscription = dayClick.pipe(
      exhaustMap((clickEvent: Event) => {
        const startingDate = extractDate(clickEvent);

        return dayMouseEnter.pipe(
          map((mouseEnterEvent: MouseEvent) => [startingDate, extractDate(mouseEnterEvent)].sort((a, b) => a - b)),
          startWith([startingDate, startingDate]),
          takeUntil(dayClick)
        );
      })
    ).subscribe((selectedRange) => {
      this.selectedRangeChange.emit(selectedRange);
      this.cd.detectChanges();
    });
  }

  selectWholeMonth(monthTimestamp: number) {
    this.selectedRangeChange.emit([
      setDate(monthTimestamp, 1).valueOf(),
      setDate(monthTimestamp, getDaysInMonth(monthTimestamp)).valueOf()
    ]);
  }

  applyOffset(offset: Date) {
    const findedIndex = this.availableMonths.findIndex(date => date.toString() === offset.toString());
    this.currentMonthIndex = findedIndex > this.availableMonths.length - 4 ? this.availableMonths.length - 4 : findedIndex;
  }
}
