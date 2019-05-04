import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild, EventEmitter,
  Input,
  OnChanges, Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { every } from 'lodash-es';
import { values } from 'ramda';

import { TableCustomNodataDirective } from './table-custom-nodata-directive';
import { TableHeadRowDirective } from './table-head-row.directive';
import { TableRowDirective } from './table-row.directive';

export enum TableSortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export interface TableRow {
  inaccurate: string;

  [key: string]: any;
}

interface TableFilter {
  field: string;
  request: string;
}

export interface TableSort {
  field: string;
  order: TableSortOrder;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-table'
  }
})
export class TableComponent implements OnChanges {
  @Input() rows: TableRow[] = [];
  @Input() isLoading = false;
  @Input() pageSize = 7;
  @Input() spaceContent: string;
  @Input() sort: TableSort = {field: null, order: TableSortOrder.Asc};
  @Input() isWithScroll = false;
  @Output() resetFilter = new EventEmitter();
  @Output() columnSort = new EventEmitter();
  @Output() sortedRows = new EventEmitter();
  @ContentChild(TableRowDirective, {read: TemplateRef}) tableRow: TemplateRef<any>;
  @ContentChild(TableHeadRowDirective, {read: TemplateRef}) tableHeadRow: TemplateRef<any>;
  @ContentChild(TableCustomNodataDirective, {read: TemplateRef}) tableCustomNodata: TemplateRef<any>;
  filters = {};
  currentPage = 0;
  displayPage = 0;
  currentPageSize = 10;
  currentRows: TableRow[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  get totalPages() {
    return Math.ceil(this.currentRows.length / this.pageSize);
  }

  get displayedRows() {
    this.currentRows = this.rows;

    if (values(this.filters).length > 0) {
      this.currentRows = this.currentRows.filter(row => {
        return every(values<any, any>(this.filters).map(
          (filter: TableFilter) => row[filter.field].toLowerCase().includes(filter.request.toLowerCase())
        ));
      });
    }

    if (this.sort.field) {
      const field = this.sort.field;
      this.currentRows = this.currentRows.slice().sort((rowA, rowB) => {
        if (rowA[field] < rowB[field]) {
          return  this.sort.order === TableSortOrder.Desc ? 1 : -1;
        }
        if (rowA[field] > rowB[field]) {
          return  this.sort.order === TableSortOrder.Desc ? -1 : 1;
        }
        return 0;
      });
    }

    return this.currentRows.slice(this.currentPage * this.pageSize,
      this.currentPage === this.displayPage ? (this.currentPage + 1) * this.pageSize
        : this.currentPage * this.pageSize + this.currentPageSize);
  }

  setFilter(filter: TableFilter) {
    this.filters[filter.field] = filter;
    this.currentPage = 0;
    this.cd.detectChanges();
    this.sortedRows.emit(this.currentRows);
  }

  setSort(sort: TableSort) {
    this.sort = sort;
    this.columnSort.emit(sort);
    this.cd.detectChanges();
    this.sortedRows.emit(this.currentRows);
  }

  reset() {
    this.filters = [];
    this.currentPage = 0;
    this.resetFilter.emit();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.displayPage = page;
    this.currentPageSize = this.pageSize;
  }

  changePageSize() {
    this.currentPageSize += this.pageSize;

    if (this.totalPages >= this.currentPage) {
      this.displayPage += 1;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pageSize']) {
      this.currentPageSize = this.pageSize;
    }
  }

}
