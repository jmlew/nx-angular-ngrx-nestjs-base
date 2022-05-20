import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { BaseDataService } from '@app/shared/util-common';

import { FormConfig } from '../entities/form-config.model';

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

  getDynamicFormConfigs(): Observable<FormConfig[]> {
    const url = `${this.baseUrl}/${ApiEndpoint.Configs}`;
    return this.data.get<FormConfig[]>(url);
  }
}
