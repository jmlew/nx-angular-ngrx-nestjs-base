import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';
import { UsersDataService } from '../../infrastructure/users.data.service';
import * as UserProfilesActions from './profiles.actions';
// import * as UserProfilesSelectors from './profiles.selectors';
import { UsersPartialState } from '..';

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

  /* loadUserProfilesNav$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      switchMap(() => this.store.select(selectUrl)),
      filter((url: string) => {
        console.log('url', url);
        return !!url;
      }),
      switchMap(() =>
        this.store.select(UserProfilesSelectors.selectAllUserProfilesLoadded)
      ),
      filter((allLoaded: boolean) => allLoaded !== true),
      map(() => UserProfilesActions.loadUserProfiles())
    )
  ); */

  /* loadUserProfilesBasicRouting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      switchMap(() => this.store.select(selectUrl)),
      filter((url: string) => url.startsWith('/users/profiles/')),
      switchMap(() => this.store.select(selectRouteData)),
      filter((data: Data) => {
        console.log('data', data);
        return data && data['component'] === 'UsersEditProfileComponent';
      }),
      switchMap(() => this.store.select(selectRouteParams)),
      switchMap((params: Params) => {
        console.log('profile params', params);
        return this.dataService.getProfiles().pipe(
          map((profiles: UserProfile[]) =>
            UserProfilesActions.loadUserProfilesSuccess({ profiles })
          ),
          catchError((error: any) =>
            of(UserProfilesActions.loadUserProfilesFailure({ error }))
          )
        );
      })
    )
  );
 */

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
    private readonly store: Store<UsersPartialState>,
    private readonly dataService: UsersDataService
  ) {}
}
