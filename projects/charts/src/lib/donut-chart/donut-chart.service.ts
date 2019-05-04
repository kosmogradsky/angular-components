import { Injectable } from '@angular/core';
import mergeDeepRight from 'ramda/src/mergeDeepRight';
import { of } from 'rxjs';

import { Store } from 'utils';

export interface DonutChartDatum {
  id: number;
  color: string;
  group?: string;
  suffix?: string;
  title: string;
  value: number;
  percent: number;
  inaccurate?: boolean;
  chartType: string;
}

export interface Tooltip {
  left: number;
  top: number;
  isHeadingLeft: boolean;
}

interface DonutChartState {
  tooltip: Tooltip;
  currentSectorIndex: number;
}

const initialState: DonutChartState = {
  tooltip: null,
  currentSectorIndex: null
};

@Injectable()
export class DonutChartService {
  store = new Store(initialState);

  setActiveSectorState(index: number) {
    this.store.setState(of({
      ...this.store.getState(),
      currentSectorIndex: index
    }));
  }

  clearSectorState() {
    this.store.setState(of({
      ...this.store.getState(),
      currentSectorIndex: initialState.currentSectorIndex
    }));
  }

  setTooltipCoordinates(x: number, y: number, isHeadingLeft: boolean) {
    this.store.setState(of(mergeDeepRight(
      this.store.getState(),
      {
        tooltip: {
          left: x,
          top: y,
          isHeadingLeft: isHeadingLeft
        }
      }
    )));
  }

  destroyTooltip() {
    this.store.setState(of({
      ...this.store.getState(),
      tooltip: initialState.tooltip
    }));
  }
}
