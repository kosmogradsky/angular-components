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
  ViewChild
} from '@angular/core';
import { scaleTime } from 'd3-scale';
import { timeMonth, timeYear } from 'd3-time';
import { addMonths, subMonths } from 'date-fns/esm';
import ramdaClamp from 'ramda/src/clamp';
import { fromEvent, merge, Subscription } from 'rxjs';
import { distinctUntilChanged, exhaustMap, map, switchMap, takeLast } from 'rxjs/operators';

import { clamp, positionOnMove, MoveAxis } from 'utils';
import { getRoundedTimePosition } from 'utils';
import { tween } from 'utils';

let uniqueId = 0;

const style = {
  height: 42,
  width: 910,
  tickWidth: 27
};

@Component({
  selector: 'app-calendar-timeline',
  templateUrl: './calendar-timeline.component.html',
  styleUrls: ['./calendar-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarTimelineComponent implements OnInit, AfterViewInit, OnDestroy {
  uniqueId = uniqueId++;
  style = style;
  @ViewChild('background') background: ElementRef;
  @ViewChild('cursor') cursor: ElementRef;
  @Input()
  set availableRange(months: number[]) {
    this._availableRange = [
      timeMonth.floor(new Date(months[0])),
      timeMonth.ceil(new Date(months[1]))
    ];
  }
  @Input() selectedRange: number[];
  @Output() offsetChange = new EventEmitter<Date>();
  scale = scaleTime();
  yearTicks: Date[] = [];
  _availableRange: Date[];
  cursorMovement: Subscription;
  eventEmission: Subscription;
  cursorTranslate = 0;
  cursorWidth = 0;

  constructor(
    private host: ElementRef,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.scale = scaleTime()
      .range([0, style.width] as ReadonlyArray<number>)
      .domain(this._availableRange);

    const initialOffset = timeMonth.floor(this.selectedRange[0] ? new Date(this.selectedRange[0]) : this._availableRange[0]);
    this.cursorWidth = this.getCursorWidth(initialOffset);
    this.cursorTranslate = ramdaClamp(...this.getCursorRange(), this.scale(initialOffset));

    this.yearTicks = timeYear.range(
      this._availableRange[0],
      this._availableRange[1]
    ).filter(tick =>
      this.scale(tick) > this.scale(this._availableRange[0]) - style.tickWidth &&
      this.scale(tick) < this.scale(this._availableRange[1]) - style.tickWidth
    );
  }

  ngAfterViewInit() {
    const cursorMoveWithTransition = fromEvent<MouseEvent>([
      this.cursor.nativeElement,
      this.background.nativeElement
    ], 'mousedown').pipe(
      exhaustMap((event) => {
        const cursorMove = positionOnMove({
          container: this.host.nativeElement,
          axis: MoveAxis.Horizontal,
          startWith: event
        }).pipe(
          map(translate => translate - this.cursorWidth / 2),
          clamp(this.getCursorRange())
        );

        const cursorTweenOnMoveEnd = cursorMove.pipe(
          takeLast(1),
          switchMap((lastPosition) => {
            const roundedPosition = getRoundedTimePosition(lastPosition, this.scale);

            return tween(lastPosition, roundedPosition, 200);
          })
        );

        return merge(cursorMove, cursorTweenOnMoveEnd);
      })
    );

    this.cursorMovement = cursorMoveWithTransition.subscribe(translate => {
      this.cursorTranslate = translate;
      this.cd.detectChanges();
    });

    this.eventEmission = cursorMoveWithTransition.pipe(
      map(position => getRoundedTimePosition(position, this.scale)),
      distinctUntilChanged()
    ).subscribe(position => {
      this.setOffset(position);
    });
  }

  ngOnDestroy() {
    this.cursorMovement.unsubscribe();
    this.eventEmission.unsubscribe();
  }

  getTransform(selectedRange: number[]) {
    const start = this.scale(selectedRange[0] || this._availableRange[0]);
    const end = this.scale(selectedRange[1] || this._availableRange[0]);

    return { x: start, width: end - start };
  }

  getCursorWidth(offset: Date) {
    const start = this.scale(offset);
    const end = this.scale(addMonths(offset, 4));

    return Math.floor(end - start);
  }

  getCursorRange() {
    return <[number, number]>[
      this.scale(this._availableRange[0]),
      this.scale(subMonths(this._availableRange[1], 4))
    ];
  }

  setOffset(position: number) {
    const offset = this.scale.invert(position);

    this.offsetChange.emit(offset);
    this.cursorWidth = this.getCursorWidth(offset);
  }

  changeCursorTranslate(date) {
    this.cursorTranslate = this.scale(date);
    this.cd.markForCheck();
  }
}
