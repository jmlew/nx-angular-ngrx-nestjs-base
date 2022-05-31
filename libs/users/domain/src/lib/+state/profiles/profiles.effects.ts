import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { UsersPartialState } from './../../../../../../../dist/libs/users/domain/lib/+state/users/users.reducer.d';
// import { USERS_MANAGE_PROFILES } from '../../entities/injected-components';
import { UserProfile } from '../../entities/user-profile.model';
import { UsersDataService } from '../../infrastructure/users.data.service';
import * as UserProfilesActions from './profiles.actions';

@Injectable()
export class UserProfilesEffects {
  loadUserProfilesBasic$ = createEffect(() => {
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

  /* loadUserProfilesBasicRouting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      map((route: RouterRequestAction) => route.payload.routerState),
      filter((routerState) => routerState.url.startsWith('/users/profiles')),
      switchMap((routerState) => {
        console.log('params', routerState['params']);
        return this.dataService.getProfiles().pipe(
          map((profiles: UserProfile[]) =>
            UserProfilesActions.loadUserProfilesSuccess({ profiles })
          ),
          catchError((error: any) =>
            of(UserProfilesActions.loadUserProfilesFailure({ error }))
          )
        );
      })
    );
  }); */

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

  /* loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      // listens for the routerNavigation action from @ngrx/router-store
      navigation(this.usersManageProfiles, {
        run: (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
          console.log('activatedRouteSnapshot', activatedRouteSnapshot);
          return this.dataService.getProfiles().pipe(
            map((profiles: UserProfile[]) =>
              UserProfilesActions.loadUserProfilesSuccess({ profiles })
            ),
            catchError((error: any) =>
              of(UserProfilesActions.loadUserProfilesFailure({ error }))
            )
          );
        },

        onError: (activatedRouteSnapshot: ActivatedRouteSnapshot, error: any) => {
          // we can log and error here and return null
          // we can also navigate back
          console.error('Navigation Error', error, activatedRouteSnapshot);
          // throw error;
          return null;
        },
      })
    )
  ); */

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<UsersPartialState>, // Check if needs UsersPartialState
    private readonly dataService: UsersDataService // @Inject(USERS_MANAGE_PROFILES) private usersManageProfiles: Type<any>
  ) {}
}
