import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})

export class ContextMenuComponent implements OnInit {
  @Input() items = [];
  @Output() clickItem = new EventEmitter();

  ngOnInit() {
  }

  itemClick(event: MouseEvent, currentItem) {
    event.stopPropagation();
    this.clickItem.emit(currentItem);
  }
}
