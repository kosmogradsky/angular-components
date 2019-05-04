import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-table-header'
  }
})
export class TableHeaderComponent implements OnInit {
  @Input() isLoading = false;
  @Input() progress = 0;

  constructor() { }

  ngOnInit() {
  }

}
