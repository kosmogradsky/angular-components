import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckboxComponent implements OnInit {
  @Input() label: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Output() change = new EventEmitter;
  @Output() checkboxClickPoint = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  check(event: Event) {
    event.stopPropagation();
    this.checked = !this.checked;
    this.change.emit(this.checked);
    const element = event.target as HTMLInputElement;
    this.checkboxClickPoint.emit(element.offsetTop);
  }

}
