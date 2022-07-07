import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormControlConfig, FormControlType } from '@app/shared/dynamicform/domain';

@Component({
  selector: 'app-dynamicform-control',
  templateUrl: './dynamicform-control.component.html',
  styleUrls: ['./dynamicform-control.component.css'],
})
export class DynamicformControlComponent {
  @Input() form: FormGroup;
  @Input() config: FormControlConfig;
  @Input() appearance?: MatFormFieldAppearance = 'outline';

  readonly FormControlType = FormControlType;

  get control(): AbstractControl {
    return this.form.controls[this.config.key];
  }

  get isValid(): boolean {
    return this.control.valid;
  }

  get isErrorShown(): boolean {
    return this.control.invalid && this.control.touched && this.control.dirty;
  }

  get errorMinLength(): unknown | undefined {
    return this.control.errors?.['minlength'];
  }

  get requiredMinLength(): unknown | undefined {
    return this.control.errors?.['minlength']?.['requiredLength'];
  }

  get errorRequired(): unknown | undefined {
    return this.control.errors?.['required'];
  }
}
