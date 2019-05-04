import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';

import { TableRow } from '../table.component';

@Component({
  selector: 'app-table-hbar',
  templateUrl: './table-hbar.component.html',
  styleUrls: ['./table-hbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableHbarComponent {
  @Input() rows: TableRow[];
  @Input() row: TableRow;
  @Input() field: string;

  constructor() { }

  get scale() {
    const maxValue = max(this.rows, row => row[this.field]);

    return scaleLinear()
      .range([0, 375])
      .domain([0, maxValue ? maxValue : 375]);
  }

}
