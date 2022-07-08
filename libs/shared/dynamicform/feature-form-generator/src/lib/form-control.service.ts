import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {
  FormControlConfig,
  FormControlDataType,
  FormControlType,
  FormControlValidators,
  FormControlsData,
  FormSchemaControlConfig,
  FormValidatorName,
  formControlTypeMap,
} from '@app/shared/dynamicform/domain';

@Injectable()
export class FormControlService {
  constructor(private readonly fb: FormBuilder) {}

  getFormControlConfigs(
    schemaConfigs: FormSchemaControlConfig[],
    formData?: FormControlsData
  ): FormControlConfig[] {
    const controls: FormControlConfig[] = schemaConfigs.map(
      (config: FormSchemaControlConfig) => {
        const value: FormControlDataType =
          formData != null ? (formData[config.key] as FormControlDataType) : '';
        const controlsLength: number = Object.keys(schemaConfigs).length;
        return this.getFormControlConfig(config, value, controlsLength);
      }
    );

    return controls.sort((a, b) => a.order - b.order);
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

  toFormGroup(controls: FormControlConfig[]): FormGroup {
    type FormControlGroup = Record<string, [FormControlDataType, ValidatorFn[]?]>;
    const group: FormControlGroup = controls.reduce(
      (accum: FormControlGroup, control: FormControlConfig) => {
        const validators: ValidatorFn[] | null =
          control.validators != null ? this.getValidators(control.validators) : null;
        const item: FormControlGroup =
          validators != null
            ? { [control.key]: [control.value, validators] }
            : { [control.key]: [control.value] };
        return { ...accum, ...item };
      },
      {} as FormControlGroup
    );
    console.log('Form group', group);
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
      case FormValidatorName.Min:
        return Validators.min(value as number);
      case FormValidatorName.Max:
        return Validators.max(value as number);
      case FormValidatorName.Required:
        return value != null ? Validators.required : undefined;
      case FormValidatorName.RequiredTrue:
        return value != null ? Validators.requiredTrue : undefined;
      case FormValidatorName.Email:
        return value != null ? Validators.email : undefined;
      case FormValidatorName.MinLength:
        return Validators.minLength(value as number);
      case FormValidatorName.MaxLength:
        return Validators.maxLength(value as number);
      case FormValidatorName.Pattern:
        return Validators.pattern(value as string);
      case FormValidatorName.NullValidator:
        return value != null ? Validators.nullValidator : undefined;
      default:
        return undefined;
    }
  }
}
