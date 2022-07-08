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

import { FormControlService } from '../form-control.service';

@Component({
  selector: 'app-dynamicform-generator',
  templateUrl: './dynamicform-generator.component.html',
  styleUrls: ['./dynamicform-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicformGeneratorComponent implements OnInit {
  form: FormGroup;
  controlConfigs: FormControlConfig[];

  @Input() formData: FormControlsData | unknown;
  @Input() labelSubmit?: string;
  @Output() formSubmit = new EventEmitter<unknown>();
  @Output() formCancel = new EventEmitter<void>();

  constructor(
    private dynamicformFacade: DynamicformFacade,
    private formInputService: FormControlService
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
      this.formData as FormControlsData,
      this.dynamicformFacade.formControls
    );

    return this.formInputService.toFormGroup(this.controlConfigs);
  }

  get isFormInvalidMessageShown(): boolean {
    return this.form.invalid && this.form.touched && this.form.dirty;
  }

  onSubmit() {
    if (this.form.valid) {
      const values: unknown = this.form.value;
      console.log('values', values);
      const rawValues: string = JSON.stringify(this.form.getRawValue());
      console.log('rawValues', rawValues);
      this.formSubmit.emit(values);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
}
