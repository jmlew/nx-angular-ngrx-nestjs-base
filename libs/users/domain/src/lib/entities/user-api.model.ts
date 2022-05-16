/*
  HTTP API Interfaces which are imported to both Angular and NestJS as the common interfaces for a given domain model. This ensures imports to NestJS through the main index.ts barrel file excludes entities which import Angular dependancies. See https://github.com/nrwl/nx/issues/9738.
*/

import { User } from './user.model';
export { User, UserParams } from './user.model';

export interface CreateUserResponse extends User {
  createdAt: string;
}

export interface UpdateUserResponse extends User {
  updatedAt: string;
}

export interface GetUsersResponse {
  data: User[];
}

export interface GetUserResponse {
  data: User;
}
