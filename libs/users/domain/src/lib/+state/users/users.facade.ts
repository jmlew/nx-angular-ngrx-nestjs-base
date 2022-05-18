import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';

import * as fromReducer from './users.reducer';
import * as fromSelectors from './users.selectors';

@Injectable()
export class UsersStoreFacade {
  loaded$ = this.store.pipe(select(fromSelectors.getUsersLoaded));
  allUsers$ = this.store.pipe(select(fromSelectors.getAllUsers));
  selectedUser$ = this.store.pipe(select(fromSelectors.getSelected));

  constructor(private readonly store: Store<fromReducer.State>) {}

  /**
   * This implementation of the Facade pattern exposes actions via the dispatch method
   * only, as opposed to methods which call actions directly. This is to promote good
   * action hygene (discouraging the reuse of actions), and to limit the abstration over
   * the intended indirection of the NgRx pattern.
   */
  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
