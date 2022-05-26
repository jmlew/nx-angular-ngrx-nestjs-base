import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as WorkitemsActions from '../+state/workitems/workitems.actions';
import { WorkitemsEffects } from '../+state/workitems/workitems.effects';
import { WorkitemsFacade } from '../+state/workitems/workitems.facade';
import {
  WORKITEMS_FEATURE_KEY,
  WorkitemsState,
  initialState,
  reducer,
} from '../+state/workitems/workitems.reducer';
import * as WorkitemsSelectors from '../+state/workitems/workitems.selectors';
import { Workitem } from '../entities/workitem.model';

interface TestSchema {
  workitems: WorkitemsState;
}

describe('WorkitemsFacade', () => {
  let facade: WorkitemsFacade;
  let store: Store<TestSchema>;
  const createWorkitem = (id: number, name = ''): Workitem => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(WORKITEMS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([WorkitemsEffects]),
        ],
        providers: [WorkitemsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(WorkitemsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allWorkitems$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.dispatch(WorkitemsActions.loadWorkitems);

      list = await readFirst(facade.allWorkitems$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadWorkitemsSuccess` to manually update list
     */
    it('allWorkitems$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allWorkitems$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.dispatch(
        WorkitemsActions.loadWorkitemsSuccess({
          workitems: [createWorkitem(1), createWorkitem(2)],
        })
      );

      list = await readFirst(facade.allWorkitems$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
