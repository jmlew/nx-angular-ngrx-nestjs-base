import { Params } from '@angular/router';
import * as fromApiStatus from '@app/shared/api-status/util';
import { selectRouteParams } from '@app/shared/navigation/domain';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import { UsersRouteParam } from '../../entities/user-routes.enum';
import {
  USER_PROFILES_KEY,
  UserProfileEntities,
  UserProfilesState,
  userProfilesAdapter,
} from './profiles.reducer';
import { UsersFeatureState } from '..';

const selectUsersFeatureState = createFeatureSelector<UsersFeatureState>('users');

export const selectUserProfilesState = createSelector(
  selectUsersFeatureState,
  (state: UsersFeatureState): UserProfilesState => state[USER_PROFILES_KEY]
);

export const {
  selectAll: selectAllUserProfiles,
  selectEntities: selectUserProfileEntities,
  selectIds: selectUserProfileIds,
  selectTotal: selectUserProfilesTotal,
} = userProfilesAdapter.getSelectors(selectUserProfilesState);

export const selectUserProfilesRequestState = createSelector(
  selectUserProfilesState,
  fromApiStatus.getApiRequestState
);

export const selectUserProfilesError = createSelector(
  selectUserProfilesRequestState,
  fromApiStatus.getApiRequestError
);

export const selectUserProfilesApiStatus = createSelector(
  selectUserProfilesRequestState,
  fromApiStatus.getApiRequestStatus
);

export const selectAllUserProfilesLoadded = createSelector(
  selectUserProfilesState,
  (state: UserProfilesState): boolean => state.allLoaded
);

export const selectCurrentUserProfileId = createSelector(
  selectRouteParams,
  (params: Params): string | undefined => params[UsersRouteParam.ProfileId]
);

export const selectCurrentUserProfile = createSelector(
  selectUserProfileEntities,
  selectCurrentUserProfileId,
  (entities: UserProfileEntities, id: string | undefined): UserProfile | undefined =>
    (id && entities[id]) || undefined
);
