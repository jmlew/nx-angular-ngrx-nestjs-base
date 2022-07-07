import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  FormControlConfig,
  FormControlDataType,
  FormControlType,
  FormControlValidators,
  FormControlsData,
  FormSchemaControlConfig,
  formControlTypeMap,
} from '@app/shared/dynamicform/domain';

@Injectable()
export class FormControlService {
  constructor(private readonly fb: FormBuilder) {}

  getFormControlConfigs(
    formData: FormControlsData,
    schemaConfigs: FormSchemaControlConfig[]
  ): FormControlConfig[] {
    const controls: FormControlConfig[] = Object.keys(formData).map((key: string) => {
      const value: FormControlDataType = formData[key] as FormControlDataType;
      const matchingConfig: FormSchemaControlConfig | undefined = schemaConfigs.find(
        (schemaConfig: FormSchemaControlConfig) => schemaConfig.key === key
      );
      const controlsLength: number = Object.keys(formData).length;
      return matchingConfig != null
        ? this.getFormControlConfig(matchingConfig, value, controlsLength)
        : this.getDefaultFormControlConfig(key, value, controlsLength);
    });

    return controls.sort((a, b) => a.order - b.order);
  }

  private getDefaultFormControlConfig(
    key: string,
    value: FormControlDataType,
    order: number
  ): FormControlConfig {
    return {
      key,
      value,
      controlType: FormControlType.TextField,
      // TODO: convert from cammelcase to title case.
      label: key,
      order,
    };
  }

  private getControlType(controlType: string): FormControlType {
    return formControlTypeMap.get(controlType) || FormControlType.TextField;
  }

  private getFormControlConfig(
    schemaConfig: FormSchemaControlConfig,
    value: FormControlDataType,
    order: number
  ): FormControlConfig {
    return {
      // TODO: normalise values to form input types (strings to booleans, etc)
      value,
      key: schemaConfig.key,
      controlType: this.getControlType(schemaConfig.controlType),
      type: schemaConfig.type,
      label: schemaConfig.label,
      order: schemaConfig.order || order,
      options: schemaConfig.options,
      validators: schemaConfig.validators,
    };
  }

  toFormGroup(controls: FormControlConfig[]): FormGroup {
    type FormControlGroup = Record<string, [FormControlDataType, ValidatorFn[]]>;
    const group: FormControlGroup = controls.reduce(
      (accum: FormControlGroup, control: FormControlConfig) => {
        const validators: ValidatorFn[] =
          control.validators != null ? this.getValidators(control.validators) : [];
        const item: FormControlGroup = { [control.key]: [control.value, validators] };
        return { ...accum, ...item };
      },
      {} as FormControlGroup
    );
    return this.fb.group(group);
  }

  private getValidators(controlValidators: FormControlValidators): ValidatorFn[] {
    return Object.keys(controlValidators).reduce((accum: ValidatorFn[], key: string) => {
      const value: unknown = controlValidators[key as keyof FormControlValidators];
      const validator: ValidatorFn | undefined = this.getValidatorFn(key, value);
      return validator ? [...accum, validator] : accum;
    }, []);
  }

  private getValidatorFn(name: string, value: unknown): ValidatorFn | undefined {
    switch (name) {
      case 'min':
        return Validators.min(value as number);
      case 'max':
        return Validators.max(value as number);
      case 'required':
        return value != null ? Validators.required : undefined;
      case 'requiredTrue':
        return value != null ? Validators.requiredTrue : undefined;
      case 'email':
        return value != null ? Validators.email : undefined;
      case 'minLength':
        return Validators.minLength(value as number);
      case 'maxLength':
        return Validators.maxLength(value as number);
      case 'pattern':
        return Validators.pattern(value as string);
      case 'nullValidator':
        return value != null ? Validators.nullValidator : undefined;
      default:
        return undefined;
    }
  }
}
