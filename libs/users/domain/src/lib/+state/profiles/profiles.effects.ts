import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { optimisticUpdate } from '@nrwl/angular';

import { WriteUserProfileResponse } from '../../entities/api/user-profile-api.model';
import { UserProfile, UserProfileParams } from '../../entities/user-profile.model';
import { DataItemType, UsersDataService } from '../../infrastructure/users.data.service';
import * as UserProfilesActions from './profiles.actions';
import * as UserProfilesFeature from './profiles.reducer';

@Injectable()
export class UserProfilesEffects {
  loadUserProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.loadUserProfiles),
      switchMap(() =>
        this.dataService.getItems(DataItemType.Profile).pipe(
          map((items: UserProfile[]) =>
            UserProfilesActions.loadUserProfilesSuccess({ items })
          ),
          catchError((error: any) =>
            of(UserProfilesActions.loadUserProfilesFailure({ error }))
          )
        )
      )
    )
  );

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.loadUserProfile),
      switchMap((action: { id: string }) => {
        const { id } = action;
        return this.dataService.getItem(DataItemType.Profile, action.id).pipe(
          map((item: UserProfile) =>
            UserProfilesActions.loadUserProfileSuccess({ item })
          ),
          catchError((error: any) =>
            of(UserProfilesActions.loadUserProfileFailure({ id, error }))
          )
        );
      })
    )
  );

  createUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.createUserProfile),
      switchMap((action: { params: UserProfileParams }) => {
        const { params } = action;
        return this.dataService.createItem(DataItemType.Profile, params).pipe(
          map((response: WriteUserProfileResponse) => {
            const item: UserProfile = { ...params, userId: response.userId };
            return UserProfilesActions.createUserProfileSuccess({ item });
          }),
          catchError((error: any) =>
            of(UserProfilesActions.createUserProfileFailure({ error }))
          )
        );
      })
    )
  );

  /**
   * Optimistically updates the store through the main action prior to retrieving the API
   * response and ensures the undoAction handles errors by reverting state changes.
   *
   * Returns an observable to ensure the data service method is executed by subscribing in
   * the Effect. If the method does not return an observable, we can call it explicitly
   * and add { dispatch: false } to this Effect.
   */
  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.updateUserProfile),
      optimisticUpdate({
        run: (
          action: ReturnType<typeof UserProfilesActions.updateUserProfile>,
          state: UserProfilesFeature.UserProfilesState
        ) =>
          this.dataService
            .updateItem(DataItemType.Profile, action.id, action.params)
            .pipe(switchMap(() => of())),
        undoAction: (
          action: ReturnType<typeof UserProfilesActions.updateUserProfile>,
          error: any
        ) => UserProfilesActions.updateUserProfileFailure({ id: action.id, error }),
      })
    )
  );

  deleteUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.deleteUserProfile),
      optimisticUpdate({
        run: (
          action: ReturnType<typeof UserProfilesActions.deleteUserProfile>,
          state: UserProfilesFeature.UserProfilesState
        ) =>
          this.dataService
            .deleteItem(DataItemType.Profile, action.id)
            .pipe(switchMap(() => of())),
        undoAction: (
          action: ReturnType<typeof UserProfilesActions.deleteUserProfile>,
          error: any
        ) => UserProfilesActions.deleteUserProfileFailure({ id: action.id, error }),
      })
    )
  );

  /**
   * Undo a failed optimistic update by reloading the server data while showing an error
   * message.
   **/

  // TODO: ensure the error remains on screen by separating the read vs write
  // ApiStatus object on the state to differentiate failed loads with failed update /
  // create / deletes.
  updateUserProfileFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.updateUserProfileFailure),
      map((action: { id: string; error: string }) =>
        UserProfilesActions.loadUserProfile({ id: action.id })
      )
    )
  );

  deleteUserProfileFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.deleteUserProfileFailure),
      map((action: { id: string; error: string }) =>
        UserProfilesActions.loadUserProfiles()
      )
    )
  );

  /**
   * Returns to the main items page upon state updates to items being written to.
   */
  returnToUserProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserProfilesActions.updateUserProfile,
        UserProfilesActions.createUserProfileSuccess
      ),
      map(() => UserProfilesActions.navToUserProfiles())
    )
  );

  /**
   * Returns to the item edit page upon failed write updates.
   */
  returnToUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.updateUserProfileFailure),
      map((action: { id: string }) => {
        const { id } = action;
        return UserProfilesActions.navToEditUserProfile({ id });
      })
    )
  );

  /**
   * Examples of Effects which handle the flow of writing changes to an item without
   * using the data persistence library optimisticUpdate or pessimisticUpdate methods.
   */
  /* updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.updateUserProfile),
      switchMap((action: { id: string; params: Partial<UserProfile> }) => {
        // TODO: Implement optimistic updates.
        const { id, params } = action;
        return this.dataService.updateItem(DataItemType.Profile, id, params).pipe(
          map((response: GenericUserProfileResponse) =>
            UserProfilesActions.updateUserProfileSuccess({ id, params })
          ),
          catchError((error: any) =>
            of(UserProfilesActions.updateUserProfileFailure({ id, error }))
          )
        );
      })
    )
  );

  deleteUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.deleteUserProfile),
      switchMap((action: { id: string }) => {
        // TODO: Implement optimistic updates.
        const { id } = action;
        return this.dataService.deleteItem(DataItemType.Profile, id).pipe(
          map((response: WriteUserProfileResponse) => {
            console.log('deleteProfile', id);
            return UserProfilesActions.deleteUserProfileSuccess({ id });
          }),
          catchError((error: any) =>
            of(UserProfilesActions.deleteUserProfileFailure({ id, error }))
          )
        );
      })
    )
  );


  */

  constructor(
    private readonly actions$: Actions,
    private readonly dataService: UsersDataService // private readonly store: Store<UserProfilesFeature.UserProfilesState>
  ) {}
}
