import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { BaseDataService } from '@app/shared/util-http';

import { GetFormConfigsResponse } from '../entities/api';

/*
  Data service to retrieve the dynamic form configs from the server.
 */

enum ApiEndpoint {
  Base = 'api',
  DynamicForm = 'dynamicform',
  Configs = 'configs',
}

@Injectable({ providedIn: 'root' })
export class FormConfigDataService {
  private baseUrl = `${ApiEndpoint.Base}/${ApiEndpoint.DynamicForm}`;

  constructor(private data: BaseDataService) {}

  getDynamicFormConfigs(): Observable<GetFormConfigsResponse> {
    const url = `${this.baseUrl}/${ApiEndpoint.Configs}`;
    return this.data.get<GetFormConfigsResponse>(url);
  }
}
