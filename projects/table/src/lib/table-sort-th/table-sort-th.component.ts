import { Component, Input, OnInit } from '@angular/core';

import { TableComponent, TableSortOrder } from '../table.component';

@Component({
  selector: 'app-table-sort-th',
  templateUrl: './table-sort-th.component.html',
  styleUrls: ['./table-sort-th.component.scss'],
  host: {
    class: 'app-table-th'
  }
})
export class TableSortThComponent implements OnInit {
  @Input() initial = false;
  @Input() field: string;
  @Input() table: TableComponent;

  constructor() {
  }

  ngOnInit() {
    if (this.initial) {
      this.sort();
    }
  }

  get hasNoData() {
    return this.table.displayedRows.length === 0;
  }

  sort() {
    const currentSort = this.table.sort;
    const field = this.field;
    let order = TableSortOrder.Desc;

    if (currentSort.field !== this.field) {
      order = TableSortOrder.Desc;
    } else {
      order = currentSort.order === TableSortOrder.Desc ?
        TableSortOrder.Asc :
        TableSortOrder.Desc;
    }

    this.table.setSort({ field, order });
  }
}
