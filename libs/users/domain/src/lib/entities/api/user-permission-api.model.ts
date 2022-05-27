/*
  HTTP API Interfaces which are imported to both Angular and NestJS as the common interfaces for a given domain model. This ensures imports to NestJS through the main index.ts barrel file excludes entities which import Angular dependancies. See https://github.com/nrwl/nx/issues/9738.
*/

import { UserPermission, UserPermissionId } from '../user-permission.model';
export { UserPermission };

export interface UpdateUserPermissionResponse extends UserPermissionId {
  status: string; // To be converted into an ID referencing the Messages API map.
}

export interface UpdateUserPermissionFailedResponse extends UserPermissionId {
  errorMessages: string[];
}
