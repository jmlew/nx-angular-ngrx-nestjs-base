import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ROUTER_FEATURE_KEY, RouterStateUrl } from '.';

export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>(ROUTER_FEATURE_KEY);

export const selectRouteParams = createSelector(
  selectRouterState,
  (router: RouterReducerState<RouterStateUrl>): Params => {
    const state: RouterStateUrl = router.state;
    return state.params;
  }
);
