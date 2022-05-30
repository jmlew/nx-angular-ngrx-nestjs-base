import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { UsersPartialState } from './../../../../../../../dist/libs/users/domain/lib/+state/users/users.reducer.d';
import { UserProfile } from '../../entities/user-profile.model';
import { UsersDataService } from '../../infrastructure/users.data.service';
import * as UserProfilesActions from './profiles.actions';
import * as UserProfilesFeature from './profiles.reducer';

@Injectable()
export class UserProfilesEffects {
  loadUserProfiles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserProfilesActions.loadUserProfiles),
      switchMap(() =>
        this.dataService.getProfiles().pipe(
          map((profiles: UserProfile[]) =>
            UserProfilesActions.loadUserProfilesSuccess({ profiles })
          ),
          catchError((error: any) =>
            of(UserProfilesActions.loadUserProfilesFailure({ error }))
          )
        )
      )
    );
  });

  /* loadUserProfiles$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(UserProfilesActions.loadUserProfiles, {
      run: (
        action: ReturnType<typeof UserProfilesActions.loadUserProfiles>,
        state: UserProfilesFeature.UserProfilesPartialState
      ) => {
        this.dataService.getAllUserProfiles().pipe(
          map((profiles: UserProfile[]) =>
            UserProfilesActions.loadUserProfilesSuccess({ profiles })
          ),
          catchError((error: any) => of(UserProfilesActions.loadUserProfilesFailure({ error })))
        );
      },
      undoAction: (action: ReturnType<typeof UserProfilesActions.loadUserProfiles>, error) => {
        console.error('Error', error);
        return UserProfilesActions.loadUserProfilesFailure({ error });
      },
    })
  ); */

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<UsersPartialState>, // Check if needs UsersPartialState
    private readonly dataService: UsersDataService
  ) {}
}
