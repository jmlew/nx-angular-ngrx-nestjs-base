import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';

import * as WorkitemsActions from './workitems.actions';
import { WorkitemsEffects } from './workitems.effects';

describe('WorkitemsEffects', () => {
  let actions: Observable<Action>;
  let effects: WorkitemsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        WorkitemsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(WorkitemsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: WorkitemsActions.loadWorkitems() });

      const expected = hot('-a-|', {
        a: WorkitemsActions.loadWorkitemsSuccess({ workitems: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
