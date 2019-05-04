import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ScaleLinear } from 'd3-scale';
import { animationFrameScheduler, fromEvent, Subscription } from 'rxjs';
import { map, observeOn, switchMap } from 'rxjs/operators';

import { positionOnMove, MoveAxis } from 'utils';

export const style = {
  width: 50,
  paddingTop: 5,
  paddingBottom: 5,
  barHeight: 7,
  barPaddingBottom: 2,
  barPaddingLeft: 8,
  barPaddingRight: 8,
  cursorWidth: 34,
  cursorOffsetLeft: 8,
  cursorStrokeWidth: 1,
  mapMarginsVertical: 0,
  get barOffsetHeight() {
    return this.barHeight + this.barPaddingBottom;
  },
  get barMaxWidth() {
    return this.cursorWidth - this.barPaddingLeft - this.barPaddingRight;
  },
  get paddingVertical() {
    return this.paddingTop + this.paddingBottom;
  }
};

let uniqueId = 0;

@Component({
  selector: 'app-hbar-chart-minimap',
  templateUrl: './hbar-chart-minimap.component.html',
  styleUrls: ['./hbar-chart-minimap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HbarChartMinimapComponent implements AfterViewInit, OnDestroy, OnInit {
  style = style;
  uniqueId = uniqueId++;
  cursorTop = 0;
  visible = false;
  minimapDragSubscription: Subscription;
  scrollSubscription: Subscription;
  @Input() data: {
    value: number
  }[];
  @Input() focusedIndex: number;
  @Input() chartScale: ScaleLinear<number, number>;
  @Input() height: number;
  @Input() chartHeight: number;
  @Input() chartRowOffsetHeight: number;
  @Input() scrollContainer: CdkVirtualScrollViewport;
  @Input() color = '#5A6B8C';
  @Input() focusedColor: string;

  getScale(value: number) {
    const width = this.chartScale.copy().range([0, style.barMaxWidth])(value);
    return width < 1 ? 1 : width;
  }

  get chartScrollHeight() {
    return this.chartRowOffsetHeight * this.data.length;
  }

  get cursorRatio() {
    return this.height / this.chartScrollHeight;
  }

  get cursorHeight() {
    return this.chartHeight * this.cursorRatio + style.paddingVertical;
  }

  get maskHeight() {
    return Math.max(10, this.cursorHeight - this.style.paddingVertical);
  }

  get isOverflowing() {
    return this.cursorHeight < this.chartHeight;
  }

  get ratio() {
    return style.barOffsetHeight / this.chartRowOffsetHeight;
  }

  get barScaleRatio() {
    return this.isOverflowing ? this.height / (this.chartScrollHeight * this.ratio) : 1;
  }

  get barHeight() {
    return style.barHeight * this.barScaleRatio;
  }

  get barPaddingBottom() {
    return style.barPaddingBottom * this.barScaleRatio;
  }

  get barOffsetHeight() {
    return this.barHeight + this.barPaddingBottom;
  }

  constructor(
    private host: ElementRef,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.visible = this.data.length >= 10;
  }

  ngAfterViewInit() {
    this.scrollSubscription = fromEvent<any>(this.scrollContainer.elementRef.nativeElement, 'scroll')
      .pipe(
        observeOn(animationFrameScheduler),
        map(event => event.target.scrollTop),
      ).subscribe((scrollTop) => {
        this.cursorTop = scrollTop * this.cursorRatio;
        this.cd.detectChanges();
      });

    this.minimapDragSubscription = fromEvent(this.host.nativeElement, 'mousedown')
      .pipe(switchMap((event: MouseEvent) => positionOnMove({
          axis: MoveAxis.Vertical,
          container: this.host.nativeElement,
          startWith: event
        })),
      ).subscribe(position => {
        const verticalCenterOfCursor = position - this.cursorHeight / 2;
        this.scrollContainer.scrollToOffset(verticalCenterOfCursor / (this.chartHeight / this.chartScrollHeight));
      });
  }

  ngOnDestroy() {
    this.minimapDragSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
  }

}
