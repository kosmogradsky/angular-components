import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SidebarComponent implements OnDestroy, OnInit {
  @Input() hideBodyScroll = true;
  @Output() close = new EventEmitter();
  private body: HTMLBodyElement;

  constructor() {
    this.body = document.getElementsByTagName('body')[0];
  }

  ngOnInit() {
    if (this.hideBodyScroll) {
      this.body.setAttribute('style', 'overflow-y: hidden');
    }
  }

  ngOnDestroy() {
    if (this.hideBodyScroll) {
      this.body.setAttribute('style', 'overflow-y: auto');
    }
  }
}
