import { User } from '../../entities/user.model';
import { UsersPartialState, initialState, usersAdapter } from './users.reducer';
import * as UsersSelectors from './users.selectors';

describe('Users Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUsersId = (it: User) => it.id;
  const createUser = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as User);

  let state: UsersPartialState;

  beforeEach(() => {
    state = {
      users: usersAdapter.setAll([createUser(1), createUser(2), createUser(3)], {
        ...initialState,
        selectedId: 2,
        error: ERROR_MSG,
        loaded: true,
      }),
    };
  });

  describe('Users Selectors', () => {
    it('getAllUsers() should return the list of Users', () => {
      const results = UsersSelectors.getAllUsers(state);
      const selId = getUsersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2);
    });

    it('getSelected() should return the selected Entity', () => {
      const result = UsersSelectors.getSelected(state) as User;
      const selId = getUsersId(result);

      expect(selId).toBe(2);
    });

    it('getUsersLoaded() should return the current "loaded" status', () => {
      const result = UsersSelectors.getUsersLoaded(state);

      expect(result).toBe(true);
    });

    it('getUsersError() should return the current "error" state', () => {
      const result = UsersSelectors.getUsersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
