import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { createLocation } from 'history';
import { build } from 'search-params';

import { NavigationService } from './navigation.service';

@Directive({
  selector: '[libLink]'
})
export class LinkDirective {
  @HostBinding('attr.target') @Input() target: string;
  @Input() libLink: string;
  @Input() queryParams: {[k: string]: any};

  get toLocation() {
    const path = this.queryParams === undefined ?
      this.libLink : {
        pathname: this.libLink,
        search: build(this.queryParams)
      };

    return createLocation(path);
  }

  @HostBinding()
  get href() {
    return this.navigation.history.createHref(this.toLocation);
  }

  @HostListener('click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'])
  onClick(button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean {
    if (button !== 0 || ctrlKey || metaKey || shiftKey) {
      return true;
    }

    if (typeof this.target === 'string' && this.target !== '_self') {
      return true;
    }

    this.navigation.urlChangeRequest$.next(this.toLocation);

    return false;
  }

  constructor(
    private navigation: NavigationService
  ) {}

}
