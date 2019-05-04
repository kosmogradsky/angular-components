import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-nodata',
  templateUrl: './table-nodata.component.html',
  styleUrls: ['./table-nodata.component.css']
})

export class TableNodataComponent {
  @Input() spaceContent: String;
  @Output() resetFilter = new EventEmitter();

  constructor() {
  }
}
