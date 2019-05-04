import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

import { separateDigits } from 'utils';

@Component({
  selector: 'app-chart-legend-item',
  templateUrl: './chart-legend-item.component.html',
  styleUrls: ['./chart-legend-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartLegendItemComponent implements OnInit {
  @Input() color: string;
  @Input() label: string;
  @Input() labelWidth: string;
  @Input() value: number | string;
  @Input() inaccurate: boolean;
  @Input() valuePrecision = 1;
  @HostBinding('class.obscured') @Input() obscured: boolean;

  get formattedValue() {
    const value = typeof this.value === 'number' ? separateDigits(this.value, this.valuePrecision) : this.value;

    return this.inaccurate ? '**' : value;
  }

  constructor() { }

  ngOnInit() {
  }

}
