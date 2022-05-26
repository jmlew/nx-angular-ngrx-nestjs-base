import { createAction, props } from '@ngrx/store';

import { Workitem } from '../../entities/workitem.model';

export const loadWorkitems = createAction('[Workitems/API] Load Workitems');

export const loadWorkitemsSuccess = createAction(
  '[Workitems/API] Load Workitems Success',
  props<{ workitems: Workitem[] }>()
);

export const loadWorkitemsFailure = createAction(
  '[Workitems/API] Load Workitems Failure',
  props<{ error: any }>()
);
