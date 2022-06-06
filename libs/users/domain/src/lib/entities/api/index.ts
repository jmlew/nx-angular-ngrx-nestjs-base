/**
 * This file is referenced as a separate path (in tsconfig.base.json) which is used in
 * both the NestJS and Angular apps to reference common interfaces and avoid NestJS
 * importaing Angular dependancies.
 */

export * from './user-profile-api.model';
export * from './user-role-api.model';
export * from './user-permission-api.model';
