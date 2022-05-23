import { createAction, props } from '@ngrx/store';

import { Workitem } from '../../entities/workitem.model';

export const loadWorkitem = createAction('[Workitem] Load Workitem');

export const loadWorkitemSuccess = createAction(
  '[Workitem] Load Workitem Success',
  props<{ workitem: Workitem[] }>()
);

export const loadWorkitemFailure = createAction(
  '[Workitem] Load Workitem Failure',
  props<{ error: any }>()
);
