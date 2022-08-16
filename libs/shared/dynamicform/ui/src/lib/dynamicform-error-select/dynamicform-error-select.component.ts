import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormControlConfig, FormValidatorName } from '@app/shared/dynamicform/domain';

@Component({
  selector: 'app-dynamicform-error-select',
  templateUrl: './dynamicform-error-select.component.html',
  styleUrls: ['./dynamicform-error-select.component.scss'],
})
export class DynamicformErrorSelectComponent {
  @Input() control: AbstractControl;
  @Input() config: FormControlConfig;

  get errorRequired(): unknown | undefined {
    return this.control.errors?.[FormValidatorName.Required];
  }
}
