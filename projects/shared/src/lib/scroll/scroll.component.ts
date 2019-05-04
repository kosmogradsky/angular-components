import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { animationFrameScheduler, fromEvent, Subscription } from 'rxjs';
import { map, observeOn, switchMap } from 'rxjs/operators';

import { positionOnMove, MoveAxis } from 'utils';

let innerLineHeight = 0;

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})

export class ScrollComponent implements AfterViewInit, OnDestroy {
  @Input() type = 'default';
  @Input() isVirtualScroll = false;
  @ViewChild('contentWrapper') contentWrapper;
  @ViewChild('scrollbarTrack') scrollbarTrack;
  @ViewChild('scrollbar') scrollbar;
  dragSubscription: Subscription;
  scrollSubscription: Subscription;
  resizeSubscription: Subscription;
  observer: MutationObserver;
  hostObserver: MutationObserver;
  offsetY = 0;
  cursorHeight = 0;
  horizontalOffset = 0;
  isHideScroll = false;

  constructor(private cd: ChangeDetectorRef, private elRef: ElementRef) {
  }

  ngAfterViewInit() {
    const contentWrapper = this.contentWrapper.nativeElement;
    this.observer = new MutationObserver(this.update.bind(this));
    this.hostObserver = new MutationObserver(this.update.bind(this));
    this.hostObserver.observe(
      this.elRef.nativeElement, { attributes: true }
    );
    this.observer.observe(contentWrapper, { subtree: true, childList: true });
    this.subscribe();
    this.update();
  }

  ngOnDestroy() {
    this.observer.disconnect();
    this.dragSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
    this.resizeSubscription.unsubscribe();
  }

  subscribe() {
    const scrollbarTrack = this.scrollbarTrack.nativeElement;
    const contentWrapper = this.isVirtualScroll ? this.contentWrapper.nativeElement.children[0] : this.contentWrapper.nativeElement;

    this.resizeSubscription = fromEvent<any>(window, 'resize')
      .pipe(map(event => event)).subscribe(() => {
        this.update();
      });

    this.scrollSubscription = fromEvent<any>(contentWrapper, 'scroll')
      .pipe(
        observeOn(animationFrameScheduler),
        map(event => event.target.scrollTop),
      ).subscribe((scrollTop) => {
        const innerHeight = contentWrapper.scrollHeight;
        this.offsetY = scrollTop / innerHeight * 100;
        this.cd.detectChanges();
      });

    this.dragSubscription = fromEvent(scrollbarTrack, 'mousedown')
      .pipe(
        switchMap((event: MouseEvent) => positionOnMove({
          axis: MoveAxis.Vertical,
          container: scrollbarTrack,
          startWith: event
        })),
      ).subscribe((position) => {
        const offset = position / scrollbarTrack.offsetHeight * 100 - this.cursorHeight / 2;
        contentWrapper.scrollTop = contentWrapper.scrollHeight * offset / 100;
      });
  }

  update() {
    const contentWrapper = this.isVirtualScroll ? this.contentWrapper.nativeElement.children[0] : this.contentWrapper.nativeElement;
    innerLineHeight = 0;
    if (contentWrapper.scrollHeight) {
      innerLineHeight = contentWrapper.clientHeight / contentWrapper.scrollHeight * 100;
    }
    this.cursorHeight = innerLineHeight;
    this.isHideScroll = innerLineHeight === 100;
    this.horizontalOffset = contentWrapper.scrollWidth - contentWrapper.offsetWidth;
    this.cd.detectChanges();
  }
}
