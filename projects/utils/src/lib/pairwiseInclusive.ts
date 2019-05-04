import { Observable } from 'rxjs';

export const pairwiseInclusive = <T>() => (source: Observable<T>) =>
  new Observable<[T, T]>(observer => {
    let prev = null;

    return source.subscribe({
      next(value) {
        observer.next([prev, value]);
        prev = value;
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    });
  });
