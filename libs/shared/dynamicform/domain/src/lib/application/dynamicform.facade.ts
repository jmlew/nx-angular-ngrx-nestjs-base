import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { FormConfig } from '../entities/form-config.model';
import { FormConfigDataService } from '../infrastructure/form-config.data.service';

@Injectable({ providedIn: 'root' })
export class DynamicformFacade {
  private formConfigListSubject = new BehaviorSubject<FormConfig[]>([]);
  formConfigList$: Observable<FormConfig[]> = this.formConfigListSubject.asObservable();

  constructor(private formConfigDataService: FormConfigDataService) {}

  loadConfigs(): void {
    this.formConfigDataService.getDynamicFormConfigs().subscribe({
      next: (configs: FormConfig[]) => {
        this.formConfigListSubject.next(configs);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }
}
