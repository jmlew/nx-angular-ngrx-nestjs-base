import { Action } from '@ngrx/store';

import { Workitem } from '../../entities/workitem.model';
import * as WorkitemsActions from './workitems.actions';
import { WorkitemsState, initialState, reducer } from './workitems.reducer';

describe('Workitems Reducer', () => {
  const createWorkitem = (id: number, name = ''): Workitem => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Workitems actions', () => {
    it('loadWorkitemsSuccess should return the list of known Workitems', () => {
      const workitems = [createWorkitem(1), createWorkitem(2)];
      const action = WorkitemsActions.loadWorkitemsSuccess({ workitems });

      const result: WorkitemsState = reducer(initialState, action);

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
