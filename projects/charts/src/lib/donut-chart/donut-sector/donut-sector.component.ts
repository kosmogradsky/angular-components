import { Component, HostListener, Input } from '@angular/core';
import { format } from 'd3-format';
import { clientPoint } from 'd3-selection';
import { arc, PieArcDatum } from 'd3-shape';
import { map } from 'rxjs/operators';

import { transition } from 'utils';
import { DonutChartDatum, DonutChartService } from '../donut-chart.service';

const createArcPathGenerator = (outerRadius: number, innerRadius: number) =>
  arc<PieArcDatum<DonutChartDatum>>().outerRadius(outerRadius).innerRadius(innerRadius);
const textDefinition = 50;

@Component({
  selector: '[appDonutSector]',  // tslint:disable-line component-selector
  templateUrl: './donut-sector.component.html',
  styleUrls: ['./donut-sector.component.css']
})

export class DonutSectorComponent {
  @Input() chartWidth: number;
  @Input() radius: number;
  @Input() weight: number;
  @Input() focusWeight: number;
  @Input() minPercent: number;
  @Input() datum: PieArcDatum<DonutChartDatum>;

  d = this.donutChartService.store.state.pipe(
    map(state => state.currentSectorIndex === this.datum.index ? this.focusWeight : this.weight),
    transition(100),
    map(weight => {
        const offset = (weight - this.weight) / 2;
        return createArcPathGenerator(this.radius + offset, this.radius - this.weight - offset)(this.datum);
      }
    )
  );

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const [offsetX] = clientPoint((<SVGElement>event.target).ownerSVGElement, event);
    this.donutChartService.setTooltipCoordinates(event.clientX, event.clientY, offsetX < this.chartWidth / 2);
  }

  @HostListener('mouseenter', [])
  onMouseEnter() {
    this.donutChartService.setActiveSectorState(this.datum.index);
  }

  @HostListener('mouseleave', [])
  onMouseLeave() {
    this.donutChartService.clearSectorState();
    this.donutChartService.destroyTooltip();
  }

  get textTransform() {
    const textTranslate = createArcPathGenerator(this.radius + textDefinition,
      this.radius - this.weight + this.focusWeight).centroid(this.datum);
    return `translate(${textTranslate})`;
  }

  get text() {
    if (this.datum.data.inaccurate) {
      return '**';
    }

    return this.datum.data.percent >= this.minPercent
      ? format('.1f')(this.datum.data.percent) + '%'
      : '';
  }

  constructor(private donutChartService: DonutChartService) {
  }
}
