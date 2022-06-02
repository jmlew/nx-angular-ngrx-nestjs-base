import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
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
          map((profiles: UserProfile[]) =>
            UserProfilesActions.loadUserProfilesSuccess({ profiles })
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
          map((profile: UserProfile) =>
            // TODO: Merge call to get newly created profile from server apply to action.
            UserProfilesActions.loadUserProfileSuccess({ profile })
          ),
          catchError((error: any) =>
            of(UserProfilesActions.loadUserProfileFailure({ error }))
          )
        )
      )
      /* optimisticUpdate({
        run: a => {
          return this.backend
            .rateTalk(a.talkId, a.rating)
            .pipe(switchMap(() => of<any>()));
        },
        undoAction: (a, e) => {
          return TalksActions.unrate({ talkId: a.talkId, error: e });
        }
      }) */
    )
  );

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
    private readonly store: Store<UserProfilesState>,
    private readonly dataService: UsersDataService
  ) {}
}
