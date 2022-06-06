import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  // constructor(private readonly notification: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        const errorMessage: string = this.getErrorMessage(error);
        console.log('ErrorHttpInterceptor errorMessage', errorMessage);
        // this.notification.error(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    return error.error
      ? error.error.message ||
          error.error.error ||
          error.error.statusMessage ||
          error.error
      : error.message;
  }
}
