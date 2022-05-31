import * as fromApiStatus from '@app/shared/api-status/util';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';

import { Workitem } from '../../entities/workitem.model';
import * as WorkitemsActions from './workitems.actions';

export const WORKITEMS_FEATURE_KEY = 'workitems';

export interface WorkitemsState
  extends EntityState<Workitem>,
    fromApiStatus.ApiRequestState {
  selectedId: number | null;
}

export interface WorkitemsPartialState {
  readonly [WORKITEMS_FEATURE_KEY]: WorkitemsState;
}

export const workitemsAdapter: EntityAdapter<Workitem> = createEntityAdapter<Workitem>({
  selectId: (item: Workitem) => item.id,
  sortComparer: (a: Workitem, b: Workitem) => a.name.localeCompare(b.name),
});

export const initialState: WorkitemsState = workitemsAdapter.getInitialState({
  selectedId: null,
  ...fromApiStatus.getApiInitState(),
});

const workitemsReducer = createReducer(
  initialState,
  on(WorkitemsActions.loadWorkitems, (state) => fromApiStatus.onApiStatePending(state)),
  on(WorkitemsActions.loadWorkitemsSuccess, (state, { workitems }) =>
    workitemsAdapter.setAll(workitems, fromApiStatus.onApiStateSuccess(state))
  ),
  on(WorkitemsActions.loadWorkitemsFailure, (state, { error }) =>
    fromApiStatus.onApiStateFailed(state, error)
  )
);

export function reducer(state: WorkitemsState | undefined, action: Action) {
  return workitemsReducer(state, action);
}

/* export const reducers: ActionReducerMap<WorkitemsPartialState> = {
  [WORKITEMS_FEATURE_KEY]: reducer,
}; */
