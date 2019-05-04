import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/reducers';
import { ActivateComparisonItem, DeactivateComparisonItem, DeleteComparisonItem } from '../../store/report/report.actions';
import { ComparisonItem } from '../../store/report/report.reducer';

@Component({
  selector: 'app-comperative-list',
  templateUrl: './comperative-list.component.html',
  styleUrls: ['./comperative-list.component.scss']
})

export class ComperativeListComponent {
  @Input() items: ComparisonItem[];
  @Input() reportName;
  @Input() activeItems: number[];

  constructor(private store: Store<AppState>) { }

  changeActive(item: ComparisonItem) {
    if (item.active) {
      this.store.dispatch(new ActivateComparisonItem(item.id));
    } else {
      this.store.dispatch(new DeactivateComparisonItem(item.id));
    }
  }

  handleDelete(item: ComparisonItem) {
    this.store.dispatch(new DeleteComparisonItem(item.id));
  }
}
