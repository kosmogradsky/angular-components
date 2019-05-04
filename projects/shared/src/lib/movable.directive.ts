import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { DraggableDirective, Position } from './draggable.directive';

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {
  @Input('appMovable') set movable(movable: boolean) {
    this.enabled = movable;
  }

  @HostBinding('class.moving') moving = false;

  position: Position = {x: 0, y: 0};

  private reset = false;
  private startPosition: Position;

  constructor(public element: ElementRef, private sanitizer: DomSanitizer) {
    super();
  }

  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostListener('dragStart', ['$event']) onDragStart(event: PointerEvent): void {
    this.moving = true;
    this.startPosition = {
      x: event.clientX - this.position.x,
      y: event.clientY - this.position.y
    };
  }

  @HostListener('dragMove', ['$event']) onDragMove(event: PointerEvent): void {
    this.position = {
      x: event.clientX - this.startPosition.x,
      y: event.clientY - this.startPosition.y,
    };
  }

  @HostListener('dragEnd') onDragEnd(): void {
    this.moving = false;

    if (this.reset) {
      this.position = {
        x: 0,
        y: 0,
      };
    }
  }
}
