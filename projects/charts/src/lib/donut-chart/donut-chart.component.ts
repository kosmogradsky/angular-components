import { Component, Input, OnChanges } from '@angular/core';
import { format } from 'd3-format';
import { pie, PieArcDatum } from 'd3-shape';
import { map } from 'rxjs/operators';

import { DonutChartDatum, DonutChartService } from './donut-chart.service';

const margin = 140;

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
  providers: [DonutChartService]
})

export class DonutChartComponent implements OnChanges {
  private _width: number;
  private _height: number;
  radius: number;
  pieData: Array<PieArcDatum<DonutChartDatum>>;
  tooltip = this.donutChartService.store.state.pipe(
    map(state => {
      if (state.tooltip === null || state.currentSectorIndex === null) {
        return null;
      }

      const currentSectorData = this.pieData[state.currentSectorIndex];

      return {
        data: {
          ...currentSectorData.data,
          formatValue: format('.1f')(currentSectorData.data.percent) + '%'
        },
        transform: `translate(calc(${state.tooltip.left}px - ${state.tooltip.isHeadingLeft ? 100 : 0}%), ${state.tooltip.top}px)`
      };
    })
  );

  @Input() focusWeight: number;
  @Input() weight: number;
  @Input() minPercent = 5;
  @Input() data: Array<DonutChartDatum>;
  @Input() groupField: string;

  @Input('width')
  set width(value: number) {
    this._width = value;
  }

  get width(): number {
    return this._width + margin;
  }

  @Input('height')
  set height(value: number) {
    this._height = value;
  }

  get height(): number {
    return this._height + margin;
  }

  get translate() {
    return `translate(${this.width / 2}, ${this.height / 2})`;
  }

  constructor(private donutChartService: DonutChartService) {
  }

  ngOnChanges() {
    this.radius = Math.min(this.height - margin, this.width - margin) / 2;
    this.weight = this.weight ? this.weight : this.radius / 12 * 5;
    this.focusWeight = this.focusWeight ? this.focusWeight : this.weight * 1.34;
    const sumValue = this.data.map(item => item.value).reduce((a, b) => a + b, 0);
    const formattedData = this.data.map(item => ({
      ...item,
      percent: item.value / sumValue * 100
    }));
    this.pieData = pie<any, DonutChartDatum>().sort(null).value((sectorData: DonutChartDatum) => sectorData.value)(formattedData);
  }
}
