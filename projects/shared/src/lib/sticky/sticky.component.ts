import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { animationFrameScheduler, fromEvent, Subscription } from 'rxjs';
import { observeOn } from 'rxjs/operators';

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.css'],
})
export class StickyComponent implements OnInit, OnDestroy {
  @Input() marginTop = 0;
  @Input() marginBottom = 0;
  @Input() elementOffsetBox = { top: 0, bottom: 0 };
  @HostBinding('class.app-sticky_stuck') stuck = false;
  scroll: Subscription;

  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.scroll = fromEvent(window, 'scroll')
      .pipe(observeOn(animationFrameScheduler))
      .subscribe(() => {
        const stuckAtTop = this.marginTop ? this.elementOffsetBox.top <= window.pageYOffset + this.marginTop
          : this.el.nativeElement.getBoundingClientRect().top <= this.marginTop;

        const stuckAtBottom = this.elementOffsetBox.bottom > window.pageYOffset + this.marginBottom;

        this.stuck = stuckAtTop || stuckAtBottom;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.scroll.unsubscribe();
  }

}
