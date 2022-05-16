import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function toStreamWithDelay<T>(data: T, delayDur = 400): Observable<T> {
  return of(data).pipe(delay(delayDur));
}
