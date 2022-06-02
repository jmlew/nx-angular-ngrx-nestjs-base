import { Data, Params } from '@angular/router';
import * as fromApiStatus from '@app/shared/api-status/util';
import * as fromRouter from '@app/shared/navigation/domain';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import {
  RouteItemContext,
  RouteItemDataKey,
  UsersRouteParam,
} from '../../entities/user-routes.enum';
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

export const selectAreAllUserProfilesLoaded = createSelector(
  selectUserProfilesState,
  (state: UserProfilesState): boolean => state.areAllLoaded
);

export const selectCurrentUserProfileId = createSelector(
  fromRouter.selectRouteParams,
  (params: Params): string | undefined => params[UsersRouteParam.ProfileId]
);

export const selectCurrentUserProfile = createSelector(
  selectUserProfileEntities,
  selectCurrentUserProfileId,
  (entities: UserProfileEntities, id: string | undefined): UserProfile | undefined =>
    (id && entities[id]) || undefined
);

export const selectIsCurrentUserProfileLoaded = createSelector(
  selectCurrentUserProfile,
  (profile: UserProfile | undefined): boolean => profile != null
);

export const selectUserProfileRouteItemContext = createSelector(
  fromRouter.selectRouteData,
  (data: Data): RouteItemContext => {
    const context: RouteItemContext = data[RouteItemDataKey.Context];
    return context || RouteItemContext.None;
  }
);
