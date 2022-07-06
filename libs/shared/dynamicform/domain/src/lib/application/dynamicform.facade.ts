import { BehaviorSubject, Observable, filter, map, mergeMap, skip } from 'rxjs';

import { Injectable } from '@angular/core';

import { GetFormConfigsResponse } from '../entities/api';
import { FormConfigs, FormControl } from '../entities/form-config.model';
import { FormConfigDataService } from '../infrastructure/form-config.data.service';

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value != null;
}

@Injectable({ providedIn: 'root' })
export class DynamicformFacade {
  private formConfigsSubject = new BehaviorSubject<FormConfigs | null>(null);

  formConfigs$: Observable<FormConfigs> = this.formConfigsSubject
    .asObservable()
    .pipe(filter(isNonNull));

  formControls$: Observable<FormControl[]> = this.formConfigs$.pipe(
    map((configs: FormConfigs) => configs.controls)
  );

  constructor(private formConfigDataService: FormConfigDataService) {}

  loadConfigs(): void {
    this.formConfigDataService.getDynamicFormConfigs().subscribe({
      next: (response: GetFormConfigsResponse) => {
        const { configs } = response;
        this.formConfigsSubject.next(configs);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }
}
