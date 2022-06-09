import { InjectionToken, Type } from '@angular/core';

export const ROUTE_COMP_USER_PROFILES = new InjectionToken<Type<any>>(
  'Route Comp User Profiles'
);

export const ROUTE_COMP_NEW_USER_PROFILE = new InjectionToken<Type<any>>(
  'Route Comp New User Profile'
);

export const ROUTE_COMP_EDIT_USER_PROFILE = new InjectionToken<Type<any>>(
  'Route Comp Edit User Profile'
);

export const ROUTE_COMP_VIEW_USER_PROFILE = new InjectionToken<Type<any>>(
  'Route Comp View User Profile'
);
