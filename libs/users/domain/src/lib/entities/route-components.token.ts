import { InjectionToken, Type } from '@angular/core';

export const ROUTE_COMP_USER_PROFILES_MAIN = new InjectionToken<Type<any>>(
  'User Profiles Main'
);

export const ROUTE_COMP_USER_PROFILES_ADD = new InjectionToken<Type<any>>(
  'User Profiles Add'
);

export const ROUTE_COMP_USER_PROFILES_EDIT = new InjectionToken<Type<any>>(
  'User Profiles Edit'
);
