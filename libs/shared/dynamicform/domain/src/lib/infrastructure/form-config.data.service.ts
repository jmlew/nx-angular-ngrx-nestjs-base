import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { FormConfig } from '../entities/form-config.model';

@Injectable({ providedIn: 'root' })
export class FormConfigDataService {
  loadConfigs(): Observable<FormConfig[]> {
    return of([
      { id: 1, name: 'attributeFoo', label: 'Form Attribute Label Foo' },
      { id: 2, name: 'attributeBar', label: 'Form Attribute Label Bar' },
    ]);
  }
}
