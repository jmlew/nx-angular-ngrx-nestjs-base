import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpSseDataService } from './http-sse.data.service';

@Injectable()
export class BaseDataService {
  constructor(private readonly http: HttpClient, private httpSse: HttpSseDataService) {}

  getSse<T>(url: string): Observable<T> {
    return this.httpSse
      .get<T>(url)
      .pipe(catchError((error: any) => throwError(() => error)));
  }

  get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(url)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }

  post<T>(url: string, body: any | null): Observable<T> {
    return this.http
      .post<T>(url, body)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }

  put<T>(url: string, body: any | null): Observable<T> {
    return this.http
      .put<T>(url, body)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(url)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }

  deleteMany<T>(url: string, body: any | null = null): Observable<T> {
    return this.http
      .request<T>('delete', url, { body })
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => error)));
  }
}
