import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TableRow } from '../table.component';

@Component({
  selector: 'app-table-cell-date',
  templateUrl: './table-cell-date.component.html',
  styleUrls: ['./table-cell-date.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-table-cell app-table-cell_date'
  }
})
export class TableCellDateComponent {
  @Input() row: TableRow;
  @Input() field: string;

  constructor() { }

}
