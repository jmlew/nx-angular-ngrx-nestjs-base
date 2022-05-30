import * as fromApiStatus from '@app/shared/api-status/util';
import {
  Dictionary,
  EntityAdapter,
  EntityState,
  createEntityAdapter,
} from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import * as UserProfilesActions from './profiles.actions';

export const USER_PROFILES_FEATURE_KEY = 'user-profiles';

export type UserProfileEntities = Dictionary<UserProfile>;

export interface UserProfilesState
  extends EntityState<UserProfile>,
    fromApiStatus.ApiRequestState {
  selectedId: number | null;
}

export const userProfilesAdapter: EntityAdapter<UserProfile> =
  createEntityAdapter<UserProfile>({
    selectId: (item: UserProfile) => item.emailId,
    sortComparer: (a: UserProfile, b: UserProfile) =>
      a.userName.localeCompare(b.userName),
  });

export const initialState: UserProfilesState = userProfilesAdapter.getInitialState({
  selectedId: null,
  ...fromApiStatus.getApiStatusInit(),
});

export const userProfilesReducer = createReducer(
  initialState,
  on(UserProfilesActions.loadUserProfiles, (state) =>
    fromApiStatus.onApiStatusPending(state)
  ),
  on(UserProfilesActions.loadUserProfilesSuccess, (state, { profiles }) =>
    userProfilesAdapter.setAll(profiles, fromApiStatus.onApiStatusSuccess(state))
  ),
  on(UserProfilesActions.loadUserProfilesFailure, (state, { error }) =>
    fromApiStatus.onApiStatusError(state, error)
  )
);
