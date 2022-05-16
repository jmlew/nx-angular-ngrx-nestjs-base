/*
  HTTP API Interfaces which are imported to both Angular and NestJS as the common interfaces for a given domain model. This ensures imports to NestJS through the main index.ts barrel file excludes entities which import Angular dependancies. See https://github.com/nrwl/nx/issues/9738.
*/

import { FormConfig } from './form-config.model';
export { FormConfig } from './form-config.model';

export interface GetFormConfigsResponse {
  data: FormConfig[];
}

export interface GetFormConfigResponse {
  data: FormConfig;
}
