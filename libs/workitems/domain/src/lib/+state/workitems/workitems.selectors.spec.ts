import { Workitem } from '../../entities/workitem.model';
import {
  WorkitemsPartialState,
  initialState,
  workitemsAdapter,
} from './workitems.reducer';
import * as WorkitemsSelectors from './workitems.selectors';

describe('Workitems Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getWorkitemsId = (it: Workitem) => it.id;
  const createWorkitem = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Workitem);

  let state: WorkitemsPartialState;

  beforeEach(() => {
    state = {
      workitems: workitemsAdapter.setAll(
        [createWorkitem(1), createWorkitem(2), createWorkitem(3)],
        {
          ...initialState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Workitems Selectors', () => {
    it('getAllWorkitems() should return the list of Workitems', () => {
      const results = WorkitemsSelectors.getAllWorkitems(state);
      const selId = getWorkitemsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(2);
    });

    it('getSelected() should return the selected Entity', () => {
      const result = WorkitemsSelectors.getSelectedWorkitem(state) as Workitem;
      const selId = getWorkitemsId(result);

      expect(selId).toBe(2);
    });

    it('getWorkitemsLoaded() should return the current "loaded" status', () => {
      const result = WorkitemsSelectors.getWorkitemsLoaded(state);

      expect(result).toBe(true);
    });

    it('getWorkitemsError() should return the current "error" state', () => {
      const result = WorkitemsSelectors.getWorkitemsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
