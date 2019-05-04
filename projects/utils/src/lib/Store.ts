import { ConnectableObservable, Observable, ReplaySubject, Subject } from 'rxjs';
import { mergeAll, publishBehavior, take, tap } from 'rxjs/operators';

export class Store<T> {
  private stateSource: Subject<Observable<T>> = new Subject();
  state: ConnectableObservable<T>;

  constructor(initialState: T) {
    this.state = this.stateSource.pipe(
      mergeAll(),
      publishBehavior(initialState)
    ) as ConnectableObservable<T>;

    this.state.connect();
  }

  getState() {
    let returnedState: T;

    this.state.pipe(take(1)).subscribe(latestState => {
      returnedState = latestState;
    });

    return returnedState;
  }

  setState(nextState: Observable<T>) {
    const effects = new ReplaySubject<T>(1);
    const nextStateWithEffects = nextState.pipe(tap(updatedState => {
      effects.next(updatedState);
      effects.complete();
    }));

    this.stateSource.next(nextStateWithEffects);

    return effects.asObservable();
  }
}
