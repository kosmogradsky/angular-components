import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hbar-chart-scroll-container',
  templateUrl: './hbar-chart-scroll-container.component.html',
  styleUrls: ['./hbar-chart-scroll-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HbarChartScrollContainerComponent implements OnInit {
  @ViewChild('scrollContainerRef') scrollContainerRef: ElementRef;
  @Input() width: number;
  @Input() height: number;

  constructor() { }

  ngOnInit() {
  }

  setScrollTop(scrollTop: number) {
    this.scrollContainerRef.nativeElement.scrollTop = scrollTop;
  }

}
