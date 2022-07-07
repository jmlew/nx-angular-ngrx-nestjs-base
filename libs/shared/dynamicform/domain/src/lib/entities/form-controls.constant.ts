import { FormControlType } from './form-config.model';

export const formControlTypeMap: Map<string, FormControlType> = new Map([
  ['textfield', FormControlType.TextField],
  ['textarea', FormControlType.TextArea],
  ['select', FormControlType.Select],
  ['checkbox', FormControlType.Checkbox],
  ['radio', FormControlType.Radio],
]);
