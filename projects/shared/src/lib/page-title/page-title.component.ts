import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';

import { fromClickOutside } from 'utils';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PageTitleComponent implements OnInit, OnDestroy {
  @Input() value: string;
  @Input() editable = false;
  @Output() changeTitle = new EventEmitter();
  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  clickSubscription: Subscription;
  isRenaming = false;
  oldValue: string;

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.clickSubscription = fromClickOutside([this.wrapper.nativeElement])
      .subscribe(() => {
        if (this.isRenaming) {
          this.cancelRename();
          this.cd.detectChanges();
        }
      });
  }

  ngOnDestroy() {
    if (this.clickSubscription) {
      this.clickSubscription.unsubscribe();
    }
  }

  rename() {
    this.isRenaming = true;
    this.oldValue = this.value;
    this.inputElement.nativeElement.focus();
    this.inputElement.nativeElement.select();
  }

  cancelRename() {
    this.isRenaming = false;
    if (!this.oldValue || this.oldValue === this.value) {
      return;
    }
    if (this.value) {
      this.changeTitle.emit(this.value);
    } else {
      this.value = this.oldValue;
    }
  }

  abortRename() {
    this.value = this.oldValue;
    this.cd.detectChanges();
  }
}
