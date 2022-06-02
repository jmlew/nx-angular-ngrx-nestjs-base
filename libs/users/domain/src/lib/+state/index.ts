import { Type } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import { UserProfilesEffects } from './profiles/profiles.effects';
import {
  USER_PROFILES_KEY,
  UserProfilesState,
  userProfilesReducer,
} from './profiles/profiles.reducer';
import { UserRoutesEffects } from './routes.effects';

export const USER_FEATURE_KEY = 'users';

export interface UsersFeatureState {
  [USER_PROFILES_KEY]: UserProfilesState;
}

export const usersReducers: ActionReducerMap<UsersFeatureState> = {
  [USER_PROFILES_KEY]: userProfilesReducer,
};

export const usersEffects: Type<unknown>[] = [UserRoutesEffects, UserProfilesEffects];

/**
 * !Important: Do not add feature selector here. Doing so creates an uncaught circular
 * dependancy which results in the 'ReferenceError: Cannot access [stateName] before
 * initialization.' error.
 */

// export const selectUsersFeatureState = createFeatureSelector<UsersFeatureState>(USER_FEATURE_KEY);
