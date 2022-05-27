import { Action } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import * as UserProfilesActions from './profiles.actions';
import { UserProfilesState, initialState, reducer } from './profiles.reducer';

describe('UserProfiles Reducer', () => {
  const createUserProfile = (id: number, name = ''): UserProfile => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid UserProfiles actions', () => {
    it('loadUserProfilesSuccess should return the list of known UserProfiles', () => {
      const profiles = [createUserProfile(1), createUserProfile(2)];
      const action = UserProfilesActions.loadUserProfilesSuccess({ profiles });

      const result: UserProfilesState = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
