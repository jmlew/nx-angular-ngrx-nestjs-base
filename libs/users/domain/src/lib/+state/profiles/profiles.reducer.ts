import * as fromApiStatus from '@app/shared/api-status/util';
import {
  Dictionary,
  EntityAdapter,
  EntityState,
  createEntityAdapter,
} from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import * as UserProfilesActions from './profiles.actions';

export const USER_PROFILES_FEATURE_KEY = 'user-profiles';

export type UserProfileEntities = Dictionary<UserProfile>;

export interface UserProfilesState
  extends EntityState<UserProfile>,
    fromApiStatus.ApiRequestState {
  // Flag to indicate whether the full collection has loaded (use with ApiRequestState)
  allLoaded: boolean;
}

export const userProfilesAdapter: EntityAdapter<UserProfile> =
  createEntityAdapter<UserProfile>({
    selectId: (item: UserProfile) => item.emailId,
    sortComparer: (a: UserProfile, b: UserProfile) =>
      a.userName.localeCompare(b.userName),
  });

export const initialState: UserProfilesState = userProfilesAdapter.getInitialState({
  allLoaded: false,
  ...fromApiStatus.getApiInitState(),
});

const reducer = createReducer(
  initialState,
  on(
    UserProfilesActions.loadUserProfiles,
    UserProfilesActions.loadUserProfile,
    UserProfilesActions.createUserProfile,
    UserProfilesActions.updateUserProfile,
    UserProfilesActions.deleteUserProfile,
    (state) => fromApiStatus.onApiStatePending(state)
  ),
  on(
    UserProfilesActions.loadUserProfilesFailure,
    UserProfilesActions.loadUserProfileFailure,
    UserProfilesActions.createUserProfileFailure,
    UserProfilesActions.updateUserProfileFailure,
    UserProfilesActions.deleteUserProfileFailure,
    (state, { error }) => fromApiStatus.onApiStateFailed(state, error)
  ),
  on(UserProfilesActions.loadUserProfilesSuccess, (state, { profiles }) =>
    userProfilesAdapter.setAll(profiles, {
      ...fromApiStatus.onApiStateSuccess(state),
      allLoaded: true,
    })
  ),
  on(UserProfilesActions.loadUserProfileSuccess, (state, { profile }) =>
    userProfilesAdapter.setOne(profile, fromApiStatus.onApiStateSuccess(state))
  ),
  on(UserProfilesActions.createUserProfileSuccess, (state, { profile }) =>
    userProfilesAdapter.addOne(profile, fromApiStatus.onApiStateSuccess(state))
  ),
  on(UserProfilesActions.updateUserProfileSuccess, (state, { profile }) =>
    userProfilesAdapter.updateOne(profile, fromApiStatus.onApiStateSuccess(state))
  ),
  on(UserProfilesActions.deleteUserProfileSuccess, (state, { id }) =>
    userProfilesAdapter.removeOne(id, fromApiStatus.onApiStateSuccess(state))
  )
);
export function userProfilesReducer(
  state: UserProfilesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
