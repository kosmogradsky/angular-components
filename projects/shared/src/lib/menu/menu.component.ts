import { ChangeDetectionStrategy, Component, HostBinding, HostListener, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  @HostBinding('class') classes = 'app-menu';
  @HostBinding('class.app-menu_visible') visible = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click')
  toggleMenu() {
    this.visible = false;
  }

  toggle() {
    this.visible = !this.visible;
  }

}
