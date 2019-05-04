import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ScaleTime } from 'd3-scale';
import { ContainerElement } from 'd3-selection';
import { timeMonth, CountableTimeInterval } from 'd3-time';
import { fromEvent, merge, Subscription } from 'rxjs';
import { distinctUntilChanged, exhaustMap, map, switchMap, takeLast } from 'rxjs/operators';

import { clampRange } from 'utils';
import { clamp, positionOnMove, MoveAxis } from 'utils';
import { getRoundedTimePosition } from 'utils';
import { tween } from 'utils';

@Component({
  selector: 'app-line-chart-slider-handle',
  templateUrl: './line-chart-slider-handle.component.html',
  styleUrls: ['./line-chart-slider-handle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartSliderHandleComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() monthScale: ScaleTime<number, number>;
  @Input() allowedRange: [number, number];
  @Input() container: ContainerElement;
  @Input() initialPosition = 0;
  @Input() position = 0;
  @Input() timeFunc: CountableTimeInterval = timeMonth;
  @Output() positionChange = new EventEmitter();
  @ViewChild('draggable') draggableRef: ElementRef;
  @ViewChild('trail') trail: TemplateRef<any>;
  translateSubscription: Subscription;
  emitEvent: Subscription;
  translate = 0;
  width = 0;
  x = 0;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    const translate$ = fromEvent<MouseEvent>(this.draggableRef.nativeElement, 'mousedown').pipe(
      exhaustMap(() => {
        const handleMove = positionOnMove({
          container: this.container,
          axis: MoveAxis.Horizontal,
        }).pipe(clamp(this.allowedRange));

        const handleTweenOnMoveEnd = handleMove.pipe(
          takeLast(1),
          switchMap((lastPosition) => {
            const clampedPosition = clampRange(this.allowedRange, [lastPosition, lastPosition]);
            const isOnBoundary = this.allowedRange.some(value => clampedPosition.includes(value));
            const roundedPosition = isOnBoundary ? lastPosition : getRoundedTimePosition(lastPosition, this.monthScale, this.timeFunc);

            return tween(lastPosition, roundedPosition, 200);
          })
        );

        return merge(handleMove, handleTweenOnMoveEnd);
      })
    );

    this.translateSubscription = translate$.subscribe((translate) => {
      this.setPosition(translate);
    });

    this.emitEvent = translate$.pipe(
      map(position => getRoundedTimePosition(position, this.monthScale, this.timeFunc)),
      distinctUntilChanged()
    ).subscribe(position => {
      this.positionChange.emit(position);
    });

    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.position &&
      getRoundedTimePosition(this.translate, this.monthScale, this.timeFunc) !== this.position
    ) {
      this.setPosition(this.position);
    }
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
    this.emitEvent.unsubscribe();
  }

  setPosition(position: number) {
    this.translate = position;
    this.x = Math.min(this.initialPosition, position);
    this.width = Math.abs(position - this.initialPosition);
    this.cd.detectChanges();
  }
}
