import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DynamicformFacade,
  FormControlConfig,
  FormControlsData,
} from '@app/shared/dynamicform/domain';

import { DynamicformService } from '../dynamicform.service';

@Component({
  selector: 'app-dynamicform-generator',
  templateUrl: './dynamicform-generator.component.html',
  styleUrls: ['./dynamicform-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicformGeneratorComponent implements OnInit {
  form: FormGroup;
  controlConfigs: FormControlConfig[];

  @Input() formData!: FormControlsData | unknown;
  @Input() labelSubmit?: string;
  @Output() formSubmit = new EventEmitter<unknown>();
  @Output() formCancel = new EventEmitter<void>();

  constructor(
    private dynamicformFacade: DynamicformFacade,
    private formInputService: DynamicformService
  ) {}

  ngOnInit() {
    this.form = this.buildForm();
    this.labelSubmit = 'Submit';
  }

  private buildForm(): FormGroup {
    if (this.dynamicformFacade.formControls == null) {
      throw Error('No dynamic form conigs are loaded.');
    }

    this.controlConfigs = this.formInputService.getFormControlConfigs(
      this.dynamicformFacade.formControls,
      this.formData as FormControlsData
    );

    return this.formInputService.toFormGroup(this.controlConfigs);
  }

  get isFormInvalidMessageShown(): boolean {
    return this.form.invalid && this.form.touched;
  }

  onSubmit() {
    if (this.form.valid) {
      const values: unknown = {
        ...(this.formData as FormControlsData),
        ...this.form.value,
      };
      console.log('values', values);
      // const rawValues: string = JSON.stringify(this.form.getRawValue());
      this.formSubmit.emit(values);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
}
