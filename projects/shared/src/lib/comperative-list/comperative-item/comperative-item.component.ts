import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comperative-item',
  templateUrl: './comperative-item.component.html',
  styleUrls: ['./comperative-item.component.scss']
})

export class ComperativeItemComponent {
  @Input() item;
  @Input() disabled = false;
  @Output() changeActive = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  toggleChecked() {
    this.item.active = !this.item.active;
    this.changeActive.emit(this.item);
  }

  handleDelete() {
    this.deleteItem.emit(this.item);
  }
}
