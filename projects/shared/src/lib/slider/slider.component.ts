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
  ViewChild
} from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { fromEvent, Subscription } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';

import { clamp, positionOnMove, MoveAxis } from 'utils';

const subtract = ([a, b]: number[]) => a - b;
const rangeOffset = 8;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('range') range: ElementRef;
  @ViewChild('firstHandle') firstHandle: ElementRef;
  @ViewChild('secondHandle') secondHandle: ElementRef;
  @Output() selectedRangeChange = new EventEmitter<any[]>();
  @Input() scale = scaleLinear().domain([0, 1]);
  @Input() selectedRange: any[] = this.scale.domain();
  @Input() minLabel: string;
  @Input() maxLabel: string;
  firstHandleMove: Subscription;
  secondHandleMove: Subscription;
  firstHandlePosition = 0;
  secondHandlePosition = 0;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  get selectedRangeTransform() {
    const scale = subtract(this.selectedRange) / subtract(this.scale.domain());

    return `translate(${this.scale(this.selectedRange[0]) - rangeOffset}px) scaleX(${scale})`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedRange) {
      this.setPositionsFromSelectedRange();
    }
  }

  ngAfterViewInit() {
    this.scale = this.scale.range([
      rangeOffset,
      this.range.nativeElement.offsetWidth - rangeOffset
    ]);

    this.setPositionsFromSelectedRange();

    this.firstHandleMove = this.createHandle$(this.firstHandle.nativeElement)
      .subscribe(position => {
        this.firstHandlePosition = position;
        this.emitSelectedRange();
      });
    this.secondHandleMove = this.createHandle$(this.secondHandle.nativeElement)
      .subscribe(position => {
        this.secondHandlePosition = position;
        this.emitSelectedRange();
      });

    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.firstHandleMove.unsubscribe();
    this.secondHandleMove.unsubscribe();
  }

  createHandle$(handleElement) {
    return fromEvent<MouseEvent>(handleElement, 'mousedown').pipe(
      tap(event => event.preventDefault()),
      switchMapTo(positionOnMove({
        axis: MoveAxis.Horizontal,
        container: this.range.nativeElement,
      })),
      clamp(<[number, number]>this.scale.range())
    );
  }

  emitSelectedRange() {
    const selectedRange = [this.firstHandlePosition, this.secondHandlePosition]
      .sort((a, b) => a - b)
      .map(position => this.scale.invert(position));

    this.selectedRangeChange.emit(selectedRange);
  }

  setPositionsFromSelectedRange() {
    if (this.firstHandlePosition <= this.secondHandlePosition) {
      this.firstHandlePosition = this.scale(this.selectedRange[0]);
      this.secondHandlePosition = this.scale(this.selectedRange[1]);
    } else {
      this.firstHandlePosition = this.scale(this.selectedRange[1]);
      this.secondHandlePosition = this.scale(this.selectedRange[0]);
    }
  }
}
