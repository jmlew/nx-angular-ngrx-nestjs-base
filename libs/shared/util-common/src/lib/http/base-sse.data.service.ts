import { Observable, Observer, catchError, throwError } from 'rxjs';

import { Injectable, NgZone } from '@angular/core';

/* Data service providing HTTP functionality for Server Sent Events as Observables. */

export interface SseStream<T> {
  source: EventSource;
  data: Observable<T>;
}

@Injectable()
export class BaseSseDataService {
  constructor(private zone: NgZone) {}

  getStream<T>(url: string): SseStream<T> {
    const sse: SseStream<T> = this.createSseStream<T>(url);
    return {
      source: sse.source,
      data: sse.data.pipe(catchError((error: unknown) => throwError(() => error))),
    };
  }

  /**
   * Creates a SSE stream by converting the event source data to an Observable and
   * returning it along with the event source itself which is useful for managing the
   * connection. Consumers shoud use the event source close() method at a minimum for
   * managing the connection.
   */
  private createSseStream<T>(url: string): SseStream<T> {
    const source: EventSource = this.getEventSource(url);
    const data: Observable<T> = new Observable<T>((observer: Observer<T>) => {
      source.onmessage = (event: MessageEvent<string>) => {
        this.zone.run(() => observer.next(JSON.parse(event.data) as T));
      };
      source.onerror = (error: unknown) => {
        this.zone.run(() => observer.error(error));
      };
    });
    return { source, data };
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
