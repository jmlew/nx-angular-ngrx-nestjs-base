import * as fromApiStatus from '@app/shared/api-status/util';
import {
  Dictionary,
  EntityAdapter,
  EntityState,
  Update,
  createEntityAdapter,
} from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import { getUserProfileId } from '../../entities/user-profile.util';
import * as UserProfilesActions from './profiles.actions';

export const USER_PROFILES_KEY = 'userProfiles';

export type UserProfileEntities = Dictionary<UserProfile>;

export interface UserProfilesState
  extends EntityState<UserProfile>,
    fromApiStatus.ApiRequestState {
  // Flag to indicate whether the full collection has loaded (use with ApiRequestState)
  areAllLoaded: boolean;
  // !Important: try to avoid storing reference to selected entities which should rather
  // be derived using selectors referencing the router params (eg. profileId).
}

export const userProfilesAdapter: EntityAdapter<UserProfile> =
  createEntityAdapter<UserProfile>({
    selectId: (item: UserProfile) => getUserProfileId(item),
    sortComparer: (a: UserProfile, b: UserProfile) =>
      a.userName.localeCompare(b.userName),
  });

export const initialState: UserProfilesState = userProfilesAdapter.getInitialState({
  areAllLoaded: false,
  ...fromApiStatus.getApiInitState(),
});

const reducer = createReducer<UserProfilesState>(
  initialState,
  on(
    UserProfilesActions.loadUserProfiles,
    UserProfilesActions.loadUserProfile,
    UserProfilesActions.createUserProfile,
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
  on(UserProfilesActions.loadUserProfilesSuccess, (state, { items }) =>
    userProfilesAdapter.setAll(items, {
      ...fromApiStatus.onApiStateSuccess(state),
      areAllLoaded: true,
    })
  ),
  on(UserProfilesActions.loadUserProfileSuccess, (state, { item }) =>
    userProfilesAdapter.setOne(item, fromApiStatus.onApiStateSuccess(state))
  ),
  on(UserProfilesActions.createUserProfileSuccess, (state, { item }) =>
    userProfilesAdapter.addOne(item, fromApiStatus.onApiStateSuccess(state))
  ),
  on(UserProfilesActions.deleteUserProfileSuccess, (state, { id }) =>
    userProfilesAdapter.removeOne(id, fromApiStatus.onApiStateSuccess(state))
  ),
  // Optimistically update profile: updates on main action instead of on success.
  on(UserProfilesActions.updateUserProfile, (state, { id, params }) => {
    const update: Update<UserProfile> = { id, changes: params };
    return userProfilesAdapter.updateOne(update, fromApiStatus.onApiStateSuccess(state));
  })
  /* on(UserProfilesActions.updateUserProfileSuccess, (state, { id, params }) => {
    const update: Update<UserProfile> = { id, changes: params };
    return userProfilesAdapter.updateOne(update, fromApiStatus.onApiStateSuccess(state));
  }) */
);
export function userProfilesReducer(
  state: UserProfilesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
