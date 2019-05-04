import { animationFrameScheduler, defer, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { takeWhileInclusive } from './takeWhileInclusive';

export type EasingFunction = (number: number) => number;

const defaultEasing = t => t * t * t;

const msElapsed = (scheduler = animationFrameScheduler) =>
  defer(() => {
    const start = scheduler.now();

    return interval(0, scheduler)
      .pipe(map(() => scheduler.now() - start));
  });

const duration = (durationInMs: number) =>
  msElapsed().pipe(
    map(elapsedMs => elapsedMs / durationInMs),
    takeWhileInclusive(completionRate => completionRate <= 1),
    map(completionRate => completionRate > 1 ? 1 : completionRate)
  );

const getPassedDistance = distance => currentTime => distance * currentTime;

export const tween = (
  start: number,
  end: number,
  durationInMs: number,
  easing: EasingFunction = defaultEasing
): Observable<number> =>
  duration(durationInMs).pipe(
    map(easing),
    map(getPassedDistance(end - start)),
    map(passedDistance => start + passedDistance)
  );
