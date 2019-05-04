import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: '[appMenuTriggerFor]', // tslint:disable-line component-selector
  templateUrl: './menu-trigger.component.html',
  styleUrls: ['./menu-trigger.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuTriggerComponent implements OnInit {
  @Input('appMenuTriggerFor') menu: MenuComponent; // tslint:disable-line no-input-rename
  @HostBinding('class.trigger_with-arrow') @Input() withArrow = true;
  @HostBinding('class.trigger_menu-visible')
  get isMenuVisible() {
    return this.menu.visible;
  }

  @HostListener('document:click', ['$event'])
  toggleMenu(event: MouseEvent) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.menu.toggle();
    } else {
      this.menu.toggleMenu();
    }
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

}
