import { createAction, props } from '@ngrx/store';

import { User } from '../../entities/user.model';

export const init = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: string | null }>()
);
