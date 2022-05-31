import { Type } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Data,
  Params,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'routerReducer';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  // component: Type<any> | string | null;
  data: Data;
}

/**
  Custom Route Serialiser returns a version of the  Router State Snapshot reduced to an
  object which includes the URL, params, and query params. This is used to reduce the
  performance overhead of serialising the engtiure router snapshot on each navigation.
  See https://ngrx.io/guide/router-store/configuration/ for more information.
*/
export class CustomRouteSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params, data } = state;

    return {
      url,
      params,
      queryParams,
      data,
    };
  }
}
