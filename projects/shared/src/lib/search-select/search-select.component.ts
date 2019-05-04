import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { concat, fromEvent, merge, of, Subscription } from 'rxjs';
import { debounceTime, exhaustMap, mapTo, switchMap, take, takeUntil, timeoutWith } from 'rxjs/operators';

import { fromClickOutside } from 'utils';

const viewportMove = merge(
  fromEvent(window, 'scroll'),
  fromEvent(window, 'resize')
)
  .pipe(exhaustMap(() => {
    return concat(
      of(false),
      merge(
        fromEvent(window, 'scroll'),
        fromEvent(window, 'resize')
      )
        .pipe(
          timeoutWith(100, of(true)),
          debounceTime(100),
          take(1),
          mapTo(true)
        )
    );
  }));

export interface Option {
  name: string;
  active: boolean;
}

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})
export class SearchSelectComponent implements OnInit, OnDestroy, OnChanges {
  @Input() inputRef: ElementRef;
  @Input() options: Option[] = [];
  @Output() itemSelect = new EventEmitter();
  @ViewChild('list', { read: ElementRef }) list: ElementRef;
  visible = false;
  position = {
    top: 0,
    left: 0,
    width: 0
  };

  focus: Subscription;

  constructor(private host: ElementRef) {
  }

  onItemSelect(value) {
    this.itemSelect.emit({ ...value, top: this.position.top });
    this.visible = false;
  }

  ngOnInit() {
    this.focus = fromEvent(this.inputRef.nativeElement, 'focus')
      .pipe(switchMap(() => {
        return concat(
          of(true),
          viewportMove.pipe(takeUntil(fromClickOutside([
            this.inputRef.nativeElement,
            this.host.nativeElement
          ]))),
          of(false)
        );
      }))
      .subscribe((isVisible) => {
        this.visible = isVisible;

        if (isVisible) {
          const inputRect = this.inputRef.nativeElement.getBoundingClientRect();
          this.position = {
            top: inputRect.bottom + 5,
            left: inputRect.left,
            width: inputRect.width
          };
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options !== undefined && this.list !== undefined) {
      this.list.nativeElement.scrollTop = 0;
    }
  }

  ngOnDestroy() {
    this.focus.unsubscribe();
  }

}
