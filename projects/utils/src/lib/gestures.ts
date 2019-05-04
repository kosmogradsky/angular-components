import { clientPoint, ContainerElement } from 'd3-selection';
import Rclamp from 'ramda/src/clamp';
import { animationFrameScheduler, fromEvent, identity, Observable } from 'rxjs';
import { map, observeOn, startWith as startWith$, takeUntil as takeUntil$, tap } from 'rxjs/operators';

export enum MoveAxis {
  Horizontal,
  Vertical
}

export const positionOnMove = ({
  axis,
  container,
  startWith,
  takeUntil = fromEvent(window, 'mouseup')
}: {
  axis: MoveAxis;
  container: ContainerElement;
  startWith?: MouseEvent;
  takeUntil?: Observable<any>
}) => fromEvent<MouseEvent>(window, 'mousemove').pipe(
  startWith ? startWith$(startWith) : identity,
  tap(event => event.preventDefault()),
  observeOn(animationFrameScheduler),
  map(event => clientPoint(container, event)[axis]),
  takeUntil$(takeUntil)
);

export const clamp = (clampingRange: [number, number]) => (source: Observable<number>) =>
  source.pipe(map(unclamped => <number>Rclamp(...clampingRange, unclamped)));
