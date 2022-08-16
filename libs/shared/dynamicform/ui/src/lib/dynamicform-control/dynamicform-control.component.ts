import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FormControlConfig, FormControlType } from '@app/shared/dynamicform/domain';

@Component({
  selector: 'app-dynamicform-control',
  templateUrl: './dynamicform-control.component.html',
  styleUrls: ['./dynamicform-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicformControlComponent {
  @Input() form: FormGroup;
  @Input() config: FormControlConfig;
  @Input() appearance?: MatFormFieldAppearance = 'outline';

  readonly FormControlType = FormControlType;

  get control(): AbstractControl {
    return this.form.controls[this.config.key];
  }

  get isErrorShown(): boolean {
    return this.control.invalid && this.control.touched;
  }
}
