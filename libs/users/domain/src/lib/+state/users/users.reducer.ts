import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { User } from '../../entities/user.model';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface State extends EntityState<User> {
  selectedId?: string | number; // which Users record has been selected
  loaded: boolean; // has the Users list been loaded
  error?: string | null; // last known error (if any)
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: State;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = usersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const usersReducer = createReducer(
  initialState,
  on(UsersActions.init, (state) => ({ ...state, loaded: false, error: null })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loaded: true })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
