import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

const tooltipOffset = 225;

@Component({
  selector: 'app-check-row',
  templateUrl: './check-row.component.html',
  styleUrls: ['./check-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CheckRowComponent {
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() checked: boolean;
  @Input() href: string;
  @Input() popupText: string;
  @Input() popupMinWidth: number;
  @Input() removable: boolean;
  @Input() tooltipMarginX = 10;
  @Input() tooltipMarginY = 16;
  @Input() tooltipAlwaysVisible = false;
  @Output() remove = new EventEmitter();
  @Output() check = new EventEmitter();
  @Output() checkboxClickPoint = new EventEmitter();
  leftTooltip = 0;
  topTooltip = 0;
  isShowTooltip = false;

  showTooltip(event: MouseEvent) {
    this.isShowTooltip = true;
    this.leftTooltip = window.innerWidth - event.clientX < tooltipOffset
      ? window.innerWidth - tooltipOffset
      : event.clientX ;
    this.topTooltip = event.clientY;
  }

  closeTooltip() {
    this.isShowTooltip = false;
  }
}
