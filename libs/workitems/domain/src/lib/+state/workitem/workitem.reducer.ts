import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Workitem } from '../../entities/workitem.model';
import * as WorkitemActions from './workitem.actions';

export const WORKITEM_FEATURE_KEY = 'workitems-workitem';

export interface State extends EntityState<Workitem> {
  selectedId?: string | number; // which Workitem record has been selected
  loaded: boolean; // has the Workitem list been loaded
  error?: string | null; // last known error (if any)
}

export interface WorkitemPartialState {
  readonly [WORKITEM_FEATURE_KEY]: State;
}

export const workitemAdapter: EntityAdapter<Workitem> = createEntityAdapter<Workitem>();

export const initialState: State = workitemAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const workitemReducer = createReducer(
  initialState,
  on(WorkitemActions.loadWorkitem, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(WorkitemActions.loadWorkitemSuccess, (state, { workitem }) =>
    workitemAdapter.upsertMany(workitem, { ...state, loaded: true })
  ),
  on(WorkitemActions.loadWorkitemFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return workitemReducer(state, action);
}
