import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';

import { TableRow } from '../table.component';

const minWidth = 3;

@Component({
  selector: 'app-table-reversible-hbar',
  templateUrl: './table-reversible-hbar.component.html',
  styleUrls: ['./table-reversible-hbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableReversibleHbarComponent {
  @Input() rows: TableRow[];
  @Input() row: TableRow;
  @Input() field: string;

  constructor() { }

  get scale() {
    const maxValue = max(this.rows, row => row[this.field]);
    const minValue = min(this.rows, row => row[this.field]);
    const absoluteMax = max([Math.abs(minValue), Math.abs(maxValue)]);

    return scaleLinear()
      .range([0, 187])
      .domain([0, absoluteMax ? absoluteMax : 187]);
  }

  getBarWidth(reversed = false) {
    const absoluteValue = Math.abs(this.row[this.field]);
    const scaledValue = this.scale(absoluteValue);
    if (scaledValue === 0 || (reversed && this.row[this.field] > 0) || (!reversed && this.row[this.field] < 0)) {
      return 0;
    }
    if (reversed && this.row[this.field] < 0) {
      return scaledValue >= minWidth ? scaledValue : minWidth;
    }

    return this.row[this.field] > 0 && scaledValue >= minWidth ? scaledValue : minWidth;
  }

}
