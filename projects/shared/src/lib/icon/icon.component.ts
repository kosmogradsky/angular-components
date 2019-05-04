import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() icon: string;
  @Input() width = '100%';
  @Input() height = '100%';

  constructor() { }

}
