export interface FormConfigs {
  controls: FormControl[];
}

export interface FormControl {
  key: string;
  // Determines the type of control component to use.
  controlType: string;
  // Determines the HTML input type (email, radio, etc)
  type?: string;
  // For cases where controlType is 'select'
  options?: SelectOption[];
  label: string;
  order?: number;
  validators?: Validators;
}

export interface SelectOption {
  key: string;
  value: string;
}

export interface Validators {
  required?: boolean;
  email?: boolean;
  minLength?: number;
}
