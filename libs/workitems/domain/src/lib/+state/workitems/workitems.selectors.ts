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
  fromApiStatus.getApiRequestState
);

export const selectWorkitemsError = createSelector(
  selectWorkitemsRequestState,
  fromApiStatus.getApiRequestError
);

export const selectWorkitemsApiStatus = createSelector(
  selectWorkitemsRequestState,
  fromApiStatus.getApiRequestStatus
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
