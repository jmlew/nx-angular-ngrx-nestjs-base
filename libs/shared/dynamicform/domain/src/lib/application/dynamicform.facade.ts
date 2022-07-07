import { BehaviorSubject, Observable, filter, map, mergeMap, skip } from 'rxjs';

import { Injectable } from '@angular/core';

import { GetFormConfigsResponse } from '../entities/api';
import {
  FormSchemaConfigs,
  FormSchemaControlConfig,
} from '../entities/form-config.model';
import { FormConfigDataService } from '../infrastructure/form-config.data.service';

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

@Injectable({ providedIn: 'root' })
export class DynamicformFacade {
  formConfigs: FormSchemaConfigs;
  formControls: FormSchemaControlConfig[];

  constructor(private formConfigDataService: FormConfigDataService) {}

  loadConfigs(): void {
    this.formConfigDataService.getDynamicFormConfigs().subscribe({
      next: (response: GetFormConfigsResponse) => {
        this.formConfigs = response.configs;
        this.formControls = this.formConfigs.controls;
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }

  // TODO add getFormFields() adn toFormGroup() from FormfieldControlService
}
