import { createAction, props } from '@ngrx/store';

import { UserProfile, UserProfileParams } from '../../entities/user-profile.model';

export const loadUserProfiles = createAction('[UserProfiles/API] Load UserProfiles');

export const loadUserProfilesSuccess = createAction(
  '[UserProfiles/API] Load UserProfiles Success',
  props<{ items: UserProfile[] }>()
);

export const loadUserProfilesFailure = createAction(
  '[UserProfiles/API] Load UserProfiles Failure',
  props<{ error: string }>()
);

export const loadUserProfile = createAction(
  '[UserProfiles/API] Load UserProfile',
  props<{ id: string }>()
);

export const loadUserProfileSuccess = createAction(
  '[UserProfiles/API] Load UserProfile Success',
  props<{ item: UserProfile }>()
);

export const loadUserProfileFailure = createAction(
  '[UserProfiles/API] Load UserProfile Failure',
  props<{ error: string }>()
);

export const updateUserProfile = createAction(
  '[UserProfiles/API] Update UserProfile',
  props<{ id: string; params: Partial<UserProfile> }>()
);

// Convert UpdateUserProfileResponse to new User Profile via the effect.
export const updateUserProfileSuccess = createAction(
  '[UserProfiles/API] Update UserProfile Success',
  props<{ id: string; params: Partial<UserProfile> }>()
);

export const updateUserProfileFailure = createAction(
  '[UserProfiles/API] Update UserProfile Failure',
  props<{ error: string }>()
);

export const createUserProfile = createAction(
  '[UserProfiles/API] Create UserProfile',
  props<{ params: UserProfileParams }>()
);

// Convert UpdateUserProfileResponse to new User Profile via the effect.
export const createUserProfileSuccess = createAction(
  '[UserProfiles/API] Create UserProfile Success',
  props<{ item: UserProfile }>()
);

export const createUserProfileFailure = createAction(
  '[UserProfiles/API] Create UserProfile Failure',
  props<{ error: string }>()
);

export const deleteUserProfile = createAction(
  '[UserProfiles/API] Delete UserProfile',
  props<{ id: string }>()
);

export const deleteUserProfileSuccess = createAction(
  '[UserProfiles/API] Delete UserProfile Success',
  props<{ id: string }>()
);

export const deleteUserProfileFailure = createAction(
  '[UserProfiles/API] Delete UserProfile Failure',
  props<{ error: string }>()
);

export const navToUserProfiles = createAction(
  '[UserProfiles/Navigate] Go to User Profiles'
);
