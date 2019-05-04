import { Inject, Injectable, InjectionToken } from '@angular/core';
import { History, Location } from 'history';
import { Observable, Subject } from 'rxjs';

export const HISTORY = new InjectionToken('routing history');

@Injectable()
export class NavigationService {
  urlChangeRequest$ = new Subject<Location>();

  urlChange$ = new Observable<Location>(subscriber => {
    subscriber.next(this.history.location);

    const unregister = this.history.listen(toLocation => {
      subscriber.next(toLocation);
    });

    return unregister;
  });

  constructor(
    @Inject(HISTORY) public history: History
  ) { }
}
