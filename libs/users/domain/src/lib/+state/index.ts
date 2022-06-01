import { Type } from '@angular/core';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { UserProfilesEffects } from './profiles/profiles.effects';
import {
  USER_PROFILES_FEATURE_KEY,
  UserProfilesState,
  userProfilesReducer,
} from './profiles/profiles.reducer';
import { UserRoutesEffects } from './routes.effects';

export const USER_FEATURE_KEY = 'users';

export interface UsersPartialState {
  [USER_PROFILES_FEATURE_KEY]: UserProfilesState;
}

export const usersReducers: ActionReducerMap<UsersPartialState> = {
  [USER_PROFILES_FEATURE_KEY]: userProfilesReducer,
};

export const usersEffects: Type<unknown>[] = [UserRoutesEffects, UserProfilesEffects];

export const selectUsersState =
  createFeatureSelector<UsersPartialState>(USER_FEATURE_KEY);
