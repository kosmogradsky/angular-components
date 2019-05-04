import { Component, Input, OnInit } from '@angular/core';

import { TableComponent } from '../table.component';

@Component({
  selector: 'app-table-search',
  templateUrl: './table-search.component.html',
  styleUrls: ['./table-search.component.css']
})
export class TableSearchComponent implements OnInit {
  @Input() placeholder: string;
  @Input() field: string;
  @Input() table: TableComponent;

  constructor() { }

  ngOnInit() {
  }

  filter(request: string) {
    this.table.setFilter({ field: this.field, request });
  }

}
