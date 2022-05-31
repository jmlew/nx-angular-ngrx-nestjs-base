import { Params } from '@angular/router';
import * as fromApiStatus from '@app/shared/api-status/util';
import * as RouterSelectors from '@app/shared/navigation/domain';
import { createSelector } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import { UsersRouteParam } from '../../entities/user-routes.enum';
import { UsersPartialState, selectUsersState } from './../index';
import {
  USER_PROFILES_FEATURE_KEY,
  UserProfileEntities,
  UserProfilesState,
  userProfilesAdapter,
} from './profiles.reducer';

export const selectUserProfilesState = createSelector(
  selectUsersState,
  (state: UsersPartialState): UserProfilesState => state[USER_PROFILES_FEATURE_KEY]
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

export const selectCurrentUserProfile = createSelector(
  selectUserProfileEntities,
  RouterSelectors.selectRouteParams,
  (entities: UserProfileEntities, params: Params): UserProfile | undefined => {
    const id: string = params[UsersRouteParam.ProfileId];
    return entities[id];
  }
);
