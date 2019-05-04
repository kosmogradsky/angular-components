import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-toggle',
  templateUrl: './icon-toggle.component.html',
  styleUrls: ['./icon-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class IconToggleComponent {
  @Input() icon: string;
  @Input() width = 14;
  @Input() height = 14;
  @Input() checked: boolean;
  @Input() isCellHovered = false;
  @Output() checkedChange = new EventEmitter();

  change(event: MouseEvent) {
    event.preventDefault();
    this.checkedChange.emit((event.target as HTMLInputElement).checked);
  }
}
