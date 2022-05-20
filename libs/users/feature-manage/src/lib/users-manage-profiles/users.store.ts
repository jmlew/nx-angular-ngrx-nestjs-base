import { EMPTY, Observable, catchError, pipe, switchMap, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import * as fromApiStatus from '@app/shared/api-status/util';
import { ManageUserProfilesFacade, User } from '@app/users/domain';
import { ComponentStore } from '@ngrx/component-store';

/* Component Store providing state management to the manage users feature.  */

interface UsersState extends fromApiStatus.ApiRequestState {
  users: User[];
  selectedId: number | null;
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  readonly allUsers$: Observable<User[]> = this.select(
    (state: UsersState) => state.users
  );
  readonly usersRequestState$: Observable<fromApiStatus.ApiRequestState> = this.select(
    fromApiStatus.getApiRequestState
  );
  readonly selectedUserId$: Observable<number | null> = this.select(
    (state: UsersState) => state.selectedId
  );

  constructor(private manageProfiles: ManageUserProfilesFacade) {
    super({
      users: [],
      selectedId: null,
      ...fromApiStatus.getApiStatusInit(),
    });
  }

  loadAllUsers = this.effect<void>(
    pipe(
      tap(() => this.patchState(fromApiStatus.getApiStatusPending())),
      switchMap(() =>
        this.manageProfiles.getAllUsers().pipe(
          tap({
            next: (users: User[]) =>
              this.patchState({ users, ...fromApiStatus.getApiStatusSuccess() }),
            error: (error: string) =>
              this.patchState(fromApiStatus.getApiStatusError(error)),
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  /* getUserById(id: number): Observable<User> {
    return this.usersManageFacade.getUserById(id);
  }

  createUser(user: UserParams): Observable<CreateUserResponse> {
    return this.usersManageFacade.createUser(user);
  }

  updateUser(user: User): Observable<UpdateUserResponse> {
    return this.usersManageFacade.updateUser(user);
  }

  deleteUser(id: number): Observable<number> {
    return this.usersManageFacade.deleteUser(id);
  }

  deleteUsers(ids: number[]): Observable<number[]> {
    return this.usersManageFacade.deleteUsers(ids);
  } */
}