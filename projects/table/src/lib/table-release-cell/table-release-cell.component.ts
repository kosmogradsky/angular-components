import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-release-cell',
  templateUrl: './table-release-cell.component.html',
  styleUrls: ['./table-release-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-table-cell app-table-cell_icon' },
})
export class TableReleaseCellComponent {
  @Input() link: string;
  isCellHovered = false;

  constructor() { }

  cellHovered(bool: boolean) {
    this.isCellHovered = bool;
  }
}
