export interface FormSchemaConfigs {
  controls: FormSchemaControlConfig[];
}

export type FormControlDataType = string | number | boolean | Date;
export enum FormControlType {
  TextField,
  TextArea,
  Select,
  Checkbox,
  Radio,
}

export interface FormControlsData {
  [key: string]: unknown;
}

// Defines the data from the schema JSON.
export interface FormSchemaControlConfig {
  key: string;
  // Determines the type of control component to use.
  controlType: string;
  // Determines the HTML input type (email, radio, etc)
  type?: string;
  label: string;
  order?: number;
  // For cases where controlType is Select or Radio
  options?: FormControlSelectOption[];
  validators?: FormControlValidators;
}

// Defines the config for the form control.
export interface FormControlConfig {
  key: string;
  value: FormControlDataType;
  controlType: FormControlType;
  type?: string;
  label: string;
  order: number;
  options?: FormControlSelectOption[];
  validators?: FormControlValidators;
}

export interface FormControlSelectOption {
  key: string;
  value: string;
}

export interface FormControlValidators {
  required: boolean;
  email?: boolean;
  minLength?: number;
}
