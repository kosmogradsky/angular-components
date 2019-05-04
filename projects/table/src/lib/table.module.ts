import { NgModule } from '@angular/core';

import { SharedModule } from 'shared';

import { TableCellDateComponent } from './table-cell-date/table-cell-date.component';
import { TableCellNumberComponent } from './table-cell-number/table-cell-number.component';
import { TableCustomNodataDirective } from './table-custom-nodata-directive';
import { TableFavoriteCellComponent } from './table-favorite-cell/table-favorite-cell.component';
import { TableHbarComponent } from './table-hbar/table-hbar.component';
import { TableHeadRowDirective } from './table-head-row.directive';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableNodataComponent } from './table-nodata/table-nodata.component';
import { TablePaginationComponent } from './table-pagination/table-pagination.component';
import { TableReleaseCellComponent } from './table-release-cell/table-release-cell.component';
import { TableReversibleHbarComponent } from './table-reversible-hbar/table-reversible-hbar.component';
import { TableRowDirective } from './table-row.directive';
import { TableSearchComponent } from './table-search/table-search.component';
import { TableSortThComponent } from './table-sort-th/table-sort-th.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TableCellDateComponent,
    TablePaginationComponent,
    TableFavoriteCellComponent,
    TableHeaderComponent,
    TableReleaseCellComponent,
    TableSearchComponent,
    TableSortThComponent,
    TableComponent,
    TableRowDirective,
    TableNodataComponent,
    TableCellNumberComponent,
    TableHbarComponent,
    TableReversibleHbarComponent,
    TableHeadRowDirective,
    TableCustomNodataDirective,
  ],
  exports: [
    TableCellDateComponent,
    TableFavoriteCellComponent,
    TableHeaderComponent,
    TableSearchComponent,
    TableSortThComponent,
    TableComponent,
    TableRowDirective,
    TableNodataComponent,
    TableCellNumberComponent,
    TableHbarComponent,
    TableReversibleHbarComponent,
    TableReleaseCellComponent,
    TableHeadRowDirective,
    TableCustomNodataDirective,
  ]
})
export class TableModule { }
