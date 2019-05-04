import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, scan, startWith } from 'rxjs/operators';

export const INITIAL_LOOP = new InjectionToken('StoreService Initial Loop');
export const REDUCER = new InjectionToken('StoreService Reducer');

export class None {
  readonly type = 'None';
}

export type Loop<S, E> = [S, E | None];
export type Reducer<S, A, E = never> = (prevState: S, action: A) => Loop<S, E>;
export type Epic<E, A> = (effect$: Observable<E>) => Observable<A>;

export const ofType = <T extends { type: string }, R extends T>(...keys: R['type'][]) =>
  (source: Observable<T>): Observable<R> =>
    source.pipe(filter((value): value is R => keys.includes(value.type)));

export const select = <T, R>(mapper: (value: T, index: number) => R) => (source: Observable<T>) => source.pipe(
  map(mapper),
  distinctUntilChanged()
);

/** @dynamic */
@Injectable()
export class StoreService<S, A extends { type: string }, E extends { type: string }> {
  action$ = new Subject<A>();

  loop$ = this.action$.pipe(
    scan<A, Loop<S, E>>(
      ([prevState], action) => this.reducer(prevState, action),
      this.initialLoop,
    ),
    startWith(this.initialLoop),
  );

  effect$ = this.loop$.pipe(
    map(([_, effect]) => effect),
    filter((effect): effect is E => effect.type !== 'None'),
  );

  state$ = this.loop$.pipe(map(([state]) => state));

  constructor(
    @Inject(INITIAL_LOOP) private initialLoop: Loop<S, E>,
    @Inject(REDUCER) private reducer: Reducer<S, A, E>
  ) { }
}
