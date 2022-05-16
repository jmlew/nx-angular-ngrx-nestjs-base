import { Action } from '@ngrx/store';

import { User } from '../../entities/user.model';
import * as UsersActions from './users.actions';
import { State, initialState, reducer } from './users.reducer';

describe('Users Reducer', () => {
  const createUser = (id: number, name = ''): User => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Users actions', () => {
    it('loadUsersSuccess should return the list of known Users', () => {
      const users = [createUser(1), createUser(2)];
      const action = UsersActions.loadUsersSuccess({ users });

      const result: State = reducer(initialState, action);

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
