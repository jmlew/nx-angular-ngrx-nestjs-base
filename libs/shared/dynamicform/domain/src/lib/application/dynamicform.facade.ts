import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { FormConfig } from '../entities/form-config';
import { FormConfigDataService } from '../infrastructure/form-config.data.service';

@Injectable({ providedIn: 'root' })
export class DynamicformFacade {
  private formConfigListSubject = new BehaviorSubject<FormConfig[]>([]);
  formConfigList$ = this.formConfigListSubject.asObservable();

  constructor(private formConfigDataService: FormConfigDataService) {}

  loadConfigs(): void {
    this.formConfigDataService.loadConfigs().subscribe({
      next: (formConfigList) => {
        this.formConfigListSubject.next(formConfigList);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }
}
