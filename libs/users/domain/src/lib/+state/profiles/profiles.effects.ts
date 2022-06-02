import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { UpdateUserProfileResponse } from '../../entities/api/user-profile-api.model';
import { UserProfile, UserProfileParams } from '../../entities/user-profile.model';
import { UsersDataService } from '../../infrastructure/users.data.service';
import * as UserProfilesActions from './profiles.actions';
import { UserProfilesState } from './profiles.reducer';
import * as UserProfilesSelectors from './profiles.selectors';

@Injectable()
export class UserProfilesEffects {
  loadUserProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.loadUserProfiles),
      switchMap(() =>
        this.dataService.getProfiles().pipe(
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
      switchMap((action: { id: string }) =>
        this.dataService.getProfile(action.id).pipe(
          map((item: UserProfile) =>
            UserProfilesActions.loadUserProfileSuccess({ item })
          ),
          catchError((error: any) =>
            of(UserProfilesActions.loadUserProfileFailure({ error }))
          )
        )
      )
    )
  );

  createUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.createUserProfile),
      switchMap((action: { params: UserProfileParams }) => {
        const { params } = action;
        return this.dataService.createProfile(params).pipe(
          map((response: UpdateUserProfileResponse) => {
            // TODO: Implement optimistic updates.
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

  updateUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserProfilesActions.updateUserProfile),
      switchMap((action: { id: string; params: Partial<UserProfile> }) => {
        // TODO: Implement optimistic updates.
        const { id, params } = action;
        return this.dataService.updateProfile(id, params).pipe(
          map((response: UpdateUserProfileResponse) => {
            // TODO: Implement optimistic updates to update the store based with the
            // request.
            return UserProfilesActions.updateUserProfileSuccess({ id, params });
          }),
          catchError((error: any) =>
            of(UserProfilesActions.updateUserProfileFailure({ error }))
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
        return this.dataService.deleteProfile(id).pipe(
          map((id: string) => {
            console.log('deleteProfile', id);
            return UserProfilesActions.deleteUserProfileSuccess({ id });
          }),
          catchError((error: any) =>
            of(UserProfilesActions.deleteUserProfileFailure({ error }))
          )
        );
      })
    )
  );

  /* updateUserProfile$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(UserProfilesActions.updateUserProfile, {
      run: (
        action: ReturnType<typeof UserProfilesActions.updateUserProfile>,
        state: UserProfilesFeature.UserProfilesPartialState
      ) => {
        this.dataService.getAllUserProfiles().pipe(
          map((profiles: UserProfile[]) =>
            UserProfilesActions.updateUserProfileSuccess({ items })
          ),
          catchError((error: any) => of(UserProfilesActions.updateUserProfileFailure({ error })))
        );
      },
      undoAction: (action: ReturnType<typeof UserProfilesActions.updateUserProfile>, error) => {
        console.error('Error', error);
        return UserProfilesActions.updateUserProfileFailure({ error });
      },
    })
  ); */

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<UserProfilesState>,
    private readonly dataService: UsersDataService
  ) {}
}
