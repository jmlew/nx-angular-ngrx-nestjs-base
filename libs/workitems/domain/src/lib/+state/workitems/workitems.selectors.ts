import * as fromApiStatus from '@app/shared/api-status/util';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Workitem } from '../../entities/workitem.model';
import {
  WORKITEMS_FEATURE_KEY,
  WorkitemsState,
  workitemsAdapter,
} from './workitems.reducer';

export const getWorkitemsState =
  createFeatureSelector<WorkitemsState>(WORKITEMS_FEATURE_KEY);

export const {
  selectAll: selectAllWorkitems,
  selectEntities: selectWorkitemEntities,
  selectIds: selectWorkitemIds,
  selectTotal: selectWorkitemsTotal,
} = workitemsAdapter.getSelectors(getWorkitemsState);

export const selectWorkitemsRequestState = createSelector(
  getWorkitemsState,
  (state: WorkitemsState): fromApiStatus.ApiRequestState =>
    fromApiStatus.getApiRequestState(state)
);

export const selectWorkitemsError = createSelector(
  selectWorkitemsRequestState,
  (state: fromApiStatus.ApiRequestState): string | null => state.error
);

export const selectWorkitemsApiStatus = createSelector(
  selectWorkitemsRequestState,
  (state: fromApiStatus.ApiRequestState): fromApiStatus.ApiStatus => state.status
);

export const selectSelectedId = createSelector(
  getWorkitemsState,
  (state: WorkitemsState): number | null => state.selectedId
);

export const selectSelectedWorkitem = createSelector(
  selectWorkitemEntities,
  selectSelectedId,
  (entities, selectedId): Workitem | undefined =>
    selectedId ? entities[selectedId] : undefined
);
