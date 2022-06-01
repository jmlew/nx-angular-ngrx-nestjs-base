import { ActivatedRouteSnapshot, Params } from '@angular/router';
import {
  RouterReducerState,
  SerializedRouterStateSnapshot,
  getSelectors,
} from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

import { ROUTER_FEATURE_KEY } from '.';

export const selectRouter = createFeatureSelector<RouterReducerState>(ROUTER_FEATURE_KEY);

export const {
  selectCurrentRoute,
  selectFragment,
  selectQueryParams,
  selectQueryParam,
  selectRouteParams,
  selectRouteParam,
  selectRouteData,
  selectUrl,
} = getSelectors(selectRouter);

export function selectAllRouteParams(snapshot: SerializedRouterStateSnapshot): Params {
  let route: ActivatedRouteSnapshot = snapshot.root;
  const params: Map<string, Params> = new Map(
    Object.keys(route.params).map((key: string) => [key, route.params[key]])
  );
  while (route.firstChild) {
    route = route.firstChild;
    Object.keys(route.params).forEach((key: string) =>
      params.set(key, route.params[key])
    );
  }
  return params;
}

export function selectAllQueryParams(snapshot: SerializedRouterStateSnapshot): Params {
  let route: ActivatedRouteSnapshot = snapshot.root;
  const params: Map<string, Params> = new Map(
    Object.keys(route.queryParams).map((key) => [key, route.queryParams[key]])
  );
  while (route.firstChild) {
    route = route.firstChild;
    Object.keys(route.queryParams).forEach((key) =>
      params.set(key, route.queryParams[key])
    );
  }
  return params;
}
