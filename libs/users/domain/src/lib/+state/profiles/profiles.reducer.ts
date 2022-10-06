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

// !Important: try to avoid storing reference to selected entities which should rather
// be derived using selectors referencing the router params (eg. profileId).
export interface UserProfilesState extends EntityState<UserProfile> {
  // Flag to indicate whether the full collection has loaded (use with ApiRequestState)
  areAllLoaded: boolean;
  readState: fromApiStatus.ApiState;
  writeState: fromApiStatus.ApiState;
}

export const userProfilesAdapter: EntityAdapter<UserProfile> =
  createEntityAdapter<UserProfile>({
    selectId: (item: UserProfile) => getUserProfileId(item),
    sortComparer: (a: UserProfile, b: UserProfile) =>
      a.userName.localeCompare(b.userName),
  });

export const initialState: UserProfilesState = userProfilesAdapter.getInitialState({
  areAllLoaded: false,
  readState: fromApiStatus.getApiInitState(),
  writeState: fromApiStatus.getApiInitState(),
});

const reducer = createReducer<UserProfilesState>(
  initialState,

  on(
    UserProfilesActions.loadUserProfiles,
    UserProfilesActions.loadUserProfile,
    (state) => ({ ...state, readState: fromApiStatus.getApiPendingState() })
  ),
  on(UserProfilesActions.createUserProfile, (state) => ({
    ...state,
    writeState: fromApiStatus.getApiPendingState(),
  })),
  on(
    UserProfilesActions.loadUserProfilesFailure,
    UserProfilesActions.loadUserProfileFailure,
    (state, { error }) => ({
      ...state,
      readState: fromApiStatus.getApiFailedState(error),
    })
  ),
  on(
    UserProfilesActions.createUserProfileFailure,
    UserProfilesActions.updateUserProfileFailure,
    UserProfilesActions.deleteUserProfileFailure,
    (state, { error }) => ({
      ...state,
      writeState: fromApiStatus.getApiFailedState(error),
    })
  ),
  on(UserProfilesActions.loadUserProfilesSuccess, (state, { items }) =>
    userProfilesAdapter.setAll(items, {
      ...state,
      areAllLoaded: true,
      readState: fromApiStatus.getApiSuccessState(),
    })
  ),
  on(UserProfilesActions.loadUserProfileSuccess, (state, { item }) =>
    userProfilesAdapter.setOne(item, {
      ...state,
      readState: fromApiStatus.getApiSuccessState(),
    })
  ),
  on(UserProfilesActions.createUserProfileSuccess, (state, { item }) =>
    userProfilesAdapter.addOne(item, {
      ...state,
      writeState: fromApiStatus.getApiSuccessState(),
    })
  ),
  // Optimistically write to profile: updates state on main action instead of on success.
  on(UserProfilesActions.updateUserProfile, (state, { id, params }) => {
    const update: Update<UserProfile> = { id, changes: params };
    return userProfilesAdapter.updateOne(update, {
      ...state,
      writeState: fromApiStatus.getApiSuccessState(),
    });
  }),
  on(UserProfilesActions.deleteUserProfile, (state, { id }) =>
    userProfilesAdapter.removeOne(id, {
      ...state,
      writeState: fromApiStatus.getApiSuccessState(),
    })
  ),
  on(UserProfilesActions.resetUserProfilesReadState, (state) => ({
    ...state,
    readState: fromApiStatus.getApiInitState(),
  })),
  on(UserProfilesActions.resetUserProfilesWriteState, (state) => ({
    ...state,
    writeState: fromApiStatus.getApiInitState(),
  }))
);
export function userProfilesReducer(
  state: UserProfilesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
