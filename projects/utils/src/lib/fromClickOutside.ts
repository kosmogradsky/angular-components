import { ElementRef, QueryList } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

export const fromClickOutside =
  (elements: QueryList<HTMLElement | ElementRef> | (HTMLElement | ElementRef)[], isPreventDefault: boolean = false) =>
    fromEvent(window.document, 'click').pipe(
      filter((event: MouseEvent) => {
        if (isPreventDefault) {
          event.preventDefault();
        }
        const someElementIsClicked = elements.some(element => {
          const htmlElement = element instanceof ElementRef ? element.nativeElement : element;

          return htmlElement.contains(<HTMLElement>event.target);
        });

        return someElementIsClicked === false;
      })
    );

