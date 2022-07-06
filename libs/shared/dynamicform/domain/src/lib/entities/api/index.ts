/**
 * This file is referenced as a separate path (in tsconfig.base.json) which is used in
 * both the NestJS and Angular apps to reference common interfaces and avoid NestJS
 * importaing Angular dependancies.
 */

export * from './form-config-api.model';
