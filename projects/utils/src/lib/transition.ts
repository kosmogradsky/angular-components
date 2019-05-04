import { of, Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

import { pairwiseInclusive } from './pairwiseInclusive';
import { tween, EasingFunction } from './tween';

export const transition = (durationInMs: number, easing?: EasingFunction) => (source: Observable<number>) =>
  source.pipe(
    distinctUntilChanged(),
    pairwiseInclusive(),
    switchMap(([prev, next]) => prev === null ?
      of(next) :
      tween(prev, next, durationInMs, easing)
    )
  );
