import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  WORKITEM_FEATURE_KEY,
  State,
  WorkitemPartialState,
  workitemAdapter,
} from './workitem.reducer';

// Lookup the 'Workitem' feature state managed by NgRx
export const getWorkitemState = createFeatureSelector<
  WorkitemPartialState,
  State
>(WORKITEM_FEATURE_KEY);

const { selectAll, selectEntities } = workitemAdapter.getSelectors();

export const getWorkitemLoaded = createSelector(
  getWorkitemState,
  (state: State) => state.loaded
);

export const getWorkitemError = createSelector(
  getWorkitemState,
  (state: State) => state.error
);

export const getAllWorkitem = createSelector(getWorkitemState, (state: State) =>
  selectAll(state)
);

export const getWorkitemEntities = createSelector(
  getWorkitemState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWorkitemState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getWorkitemEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
