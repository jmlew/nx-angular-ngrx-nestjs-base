import * as fromApiStatus from '@app/shared/api-status/util';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import {
  USER_PROFILES_FEATURE_KEY,
  UserProfilesState,
  profilesAdapter,
} from './profiles.reducer';

export const getUserProfilesState = createFeatureSelector<UserProfilesState>(
  USER_PROFILES_FEATURE_KEY
);

export const {
  selectAll: selectAllUserProfiles,
  selectEntities: selectUserProfileEntities,
  selectIds: selectUserProfileIds,
  selectTotal: selectUserProfilesTotal,
} = profilesAdapter.getSelectors(getUserProfilesState);

export const selectUserProfilesRequestState = createSelector(
  getUserProfilesState,
  (state: UserProfilesState): fromApiStatus.ApiRequestState =>
    fromApiStatus.getApiRequestState(state)
);

export const selectUserProfilesError = createSelector(
  selectUserProfilesRequestState,
  (state: fromApiStatus.ApiRequestState): string | null => state.error
);

export const selectUserProfilesApiStatus = createSelector(
  selectUserProfilesRequestState,
  (state: fromApiStatus.ApiRequestState): fromApiStatus.ApiStatus => state.status
);

export const selectSelectedId = createSelector(
  getUserProfilesState,
  (state: UserProfilesState): number | null => state.selectedId
);

export const selectSelectedUserProfile = createSelector(
  selectUserProfileEntities,
  selectSelectedId,
  (entities, selectedId): UserProfile | undefined =>
    selectedId ? entities[selectedId] : undefined
);
