import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-favorite-cell',
  templateUrl: './table-favorite-cell.component.html',
  styleUrls: ['./table-favorite-cell.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-table-cell app-table-cell_icon'
  }
})
export class TableFavoriteCellComponent {
  @Output() toggle = new EventEmitter();
  @Input() checked = false;
  isCellHovered = false;

  constructor() { }

  cellHovered(bool: boolean) {
    this.isCellHovered = bool;
  }

  click(event: MouseEvent) {
    event.preventDefault();
    this.toggle.emit(!this.checked);
  }
}
