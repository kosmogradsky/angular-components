import {  Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

export interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {
  @Input('appDraggable') @HostBinding('class.draggable') enabled = true;

  @HostBinding('attr.touch-action') touchAction = 'none';

  @HostBinding('class.dragging') dragging = false;
  @HostBinding('class.helper-active') helperActive = false;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  ngOnInit(): void {
  }

  @HostListener('pointerdown', ['$event']) onPointerDown(event: PointerEvent) {
    this.dragging = true;
    this.dragStart.next(event);
  }

  @HostListener('document:pointermove', ['$event']) onPointerMove(event: PointerEvent) {
    if (!this.dragging) {
      return;
    }

    this.dragMove.next(event);
  }

  @HostListener('document:pointerup', ['$event']) onPointerUp(event: PointerEvent) {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.dragEnd.next(event);
  }
}
