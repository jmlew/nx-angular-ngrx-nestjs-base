import { environment } from '@app/shared/environments';
import { ROUTER_FEATURE_KEY } from '@app/shared/navigation/domain';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer, RuntimeChecks } from '@ngrx/store';

export interface RootPartialState {
  [ROUTER_FEATURE_KEY]: RouterReducerState;
}

export const rootReducers: ActionReducerMap<RootPartialState> = {
  [ROUTER_FEATURE_KEY]: routerReducer,
};

export const rootMetaReducers: MetaReducer[] = !environment.production ? [] : [];

export const rootRuntimeChecks: Partial<RuntimeChecks> = {
  strictActionImmutability: true,
  strictStateImmutability: true,
};
