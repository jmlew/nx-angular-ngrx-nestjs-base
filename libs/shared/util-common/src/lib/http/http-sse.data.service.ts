import { Observable, Observer } from 'rxjs';

import { Injectable, NgZone } from '@angular/core';

/* Data service providing HTTP functionality for Server Sent Events as Observables. */

@Injectable()
export class HttpSseDataService {
  constructor(private _zone: NgZone) {}
  get<T>(url: string): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = (event) => {
        this._zone.run(() => observer.next(JSON.parse(event.data) as T));
      };
      eventSource.onerror = (error: any) => {
        this._zone.run(() => observer.error(error));
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
