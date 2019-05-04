import { Observable } from 'rxjs';

export const takeWhileInclusive = <T>(predicate: (value: T, index: number) => boolean) => (source: Observable<T>) =>
  new Observable<T>(observer => {
    let index = 0;

    return source.subscribe({
      next(value) {
        const result = predicate(value, index++);

        if (Boolean(result)) {
          observer.next(value);
        } else {
          observer.next(value);
          observer.complete();
        }
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    });
  });
