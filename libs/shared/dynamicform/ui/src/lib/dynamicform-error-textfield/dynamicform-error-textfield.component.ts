import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormControlConfig, FormValidatorName } from '@app/shared/dynamicform/domain';

@Component({
  selector: 'app-dynamicform-error-textfield',
  templateUrl: './dynamicform-error-textfield.component.html',
  styleUrls: ['./dynamicform-error-textfield.component.scss'],
})
export class DynamicformErrorTextfieldComponent {
  @Input() control: AbstractControl;
  @Input() config: FormControlConfig;

  get errorMinLength(): unknown | undefined {
    return this.control.errors?.[FormValidatorName.MinLength];
  }

  get requiredMinLength(): unknown | undefined {
    return this.control.errors?.[FormValidatorName.MinLength]?.['requiredLength'];
  }

  get errorRequired(): unknown | undefined {
    return this.control.errors?.[FormValidatorName.Required];
  }

  get errorEmail(): unknown | undefined {
    return this.control.errors?.[FormValidatorName.Email];
  }
}
