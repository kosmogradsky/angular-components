import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
  @Input() isDuration = true;
  @Input() showDuration = 3000;
  @Input() hasCancel = false;
  @Output() close = new EventEmitter();
  @Output() abort = new EventEmitter();

  @HostListener('click')
  closeModal() {
    this.close.emit();
  }

  ngOnInit() {
    if (this.isDuration) {
      interval(this.showDuration)
        .pipe(take(1))
        .subscribe(() => this.closeModal());
    }
  }
}
