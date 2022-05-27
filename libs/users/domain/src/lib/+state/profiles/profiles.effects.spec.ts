import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';

import * as UserProfilesActions from './profiles.actions';
import { UserProfilesEffects } from './profiles.effects';

describe('UserProfilesEffects', () => {
  let actions: Observable<Action>;
  let effects: UserProfilesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UserProfilesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UserProfilesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UserProfilesActions.loadUserProfiles() });

      const expected = hot('-a-|', {
        a: UserProfilesActions.loadUserProfilesSuccess({ profiles: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
