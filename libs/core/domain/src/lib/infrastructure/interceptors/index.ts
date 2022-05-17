import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorHttpInterceptor } from './error-http.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorHttpInterceptor,
    multi: true,
  },
];

export * from './error-http.interceptor';
