import { Component, EventEmitter, Input, Output } from '@angular/core';
import { range } from 'd3-array';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})

export class TablePaginationComponent {
  @Input() currentPage: number;
  @Input() totalPages: number;
  @Output() currentPageChange = new EventEmitter();
  @Output() pageSizeChange = new EventEmitter();

  get lastPage() {
    return this.totalPages - 1;
  }

  get quickPages() {
    const prevPages = range(Math.max(this.currentPage - 2, 0), this.currentPage);
    const currentAndNextPages = range(this.currentPage, Math.min(this.lastPage, this.currentPage + 2) + 1);

    return prevPages.concat(currentAndNextPages);
  }
}
