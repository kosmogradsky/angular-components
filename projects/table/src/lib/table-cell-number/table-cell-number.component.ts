import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { separateDigits } from 'utils';
import { TableRow } from '../table.component';

@Component({
  selector: 'app-table-cell-number',
  templateUrl: './table-cell-number.component.html',
  styleUrls: ['./table-cell-number.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-table-cell'
  }
})
export class TableCellNumberComponent {
  @Input() row: TableRow;
  @Input() field: string;
  @Input() digitsAfterComa = 1;
  @Input() hidden = false;
  @Input() withSign = false;

  constructor() { }

  get formattedValue() {
    const sign = Number(this.row[this.field]) > 0 ? '+' : '';
    const value = typeof this.row[this.field] === 'number'
      ? (this.withSign ? sign : '') + separateDigits(this.row[this.field], this.digitsAfterComa)
      : this.row[this.field];

    if (this.hidden) {
      return '-';
    }
    if (this.row.ins) {
      return '**';
    }
    return value.toString().replace('.', ',');
  }
}
