import { RouterReducerState, getSelectors } from '@ngrx/router-store';
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
