import { UserProfile } from '../../entities/user-profile.model';
import {
  UserProfilesPartialState,
  initialState,
  profilesAdapter,
} from './profiles.reducer';
import * as UserProfilesSelectors from './profiles.selectors';

describe('UserProfiles Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUserProfilesId = (it: UserProfile) => it.id;
  const createUserProfile = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as UserProfile);

  let state: UserProfilesPartialState;

  beforeEach(() => {
    state = {
      profiles: profilesAdapter.setAll(
        [createUserProfile(1), createUserProfile(2), createUserProfile(3)],
        {
          ...initialState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('UserProfiles Selectors', () => {
    it('getAllUserProfiles() should return the list of UserProfiles', () => {
      const results = UserProfilesSelectors.getAllUserProfiles(state);
      const selId = getUserProfilesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2);
    });

    it('getSelected() should return the selected Entity', () => {
      const result = UserProfilesSelectors.getSelectedUserProfile(state) as UserProfile;
      const selId = getUserProfilesId(result);

      expect(selId).toBe(2);
    });

    it('getUserProfilesLoaded() should return the current "loaded" status', () => {
      const result = UserProfilesSelectors.getUserProfilesLoaded(state);

      expect(result).toBe(true);
    });

    it('getUserProfilesError() should return the current "error" state', () => {
      const result = UserProfilesSelectors.getUserProfilesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
