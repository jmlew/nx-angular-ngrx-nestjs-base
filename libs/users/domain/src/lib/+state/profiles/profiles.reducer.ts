import * as fromApiStatus from '@app/shared/api-status/util';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import * as UserProfilesActions from './profiles.actions';

export const USER_PROFILES_FEATURE_KEY = 'user-profiles';

export interface UserProfilesState
  extends EntityState<UserProfile>,
    fromApiStatus.ApiRequestState {
  selectedId: number | null;
}

export interface UserProfilesPartialState {
  readonly [USER_PROFILES_FEATURE_KEY]: UserProfilesState;
}

export const profilesAdapter: EntityAdapter<UserProfile> =
  createEntityAdapter<UserProfile>({
    selectId: (item: UserProfile) => item.emailId,
    sortComparer: (a: UserProfile, b: UserProfile) =>
      a.userName.localeCompare(b.userName),
  });

export const initialState: UserProfilesState = profilesAdapter.getInitialState({
  selectedId: null,
  ...fromApiStatus.getApiStatusInit(),
});

const profilesReducer = createReducer(
  initialState,
  on(UserProfilesActions.loadUserProfiles, (state) =>
    fromApiStatus.onApiStatusPending(state)
  ),
  on(UserProfilesActions.loadUserProfilesSuccess, (state, { profiles }) =>
    profilesAdapter.setAll(profiles, fromApiStatus.onApiStatusSuccess(state))
  ),
  on(UserProfilesActions.loadUserProfilesFailure, (state, { error }) =>
    fromApiStatus.onApiStatusError(state, error)
  )
);

export function reducer(state: UserProfilesState | undefined, action: Action) {
  return profilesReducer(state, action);
}

// TODO: Move reducer map with 'users' feature key to parent dir index.ts and reference in domain module.
/* export const reducers: ActionReducerMap<UserProfilesPartialState> = {
  [WORKITEMS_FEATURE_KEY]: reducer,
}; */
