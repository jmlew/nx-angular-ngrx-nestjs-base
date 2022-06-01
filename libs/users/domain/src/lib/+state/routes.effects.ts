import { catchError, map, of, switchMap } from 'rxjs';

import { navigation } from '@nrwl/angular';
import { Inject, Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserProfilesActions from './profiles/profiles.actions';

import {
  ROUTE_COMP_USER_PROFILES_ADD,
  ROUTE_COMP_USER_PROFILES_EDIT,
  ROUTE_COMP_USER_PROFILES_MAIN,
} from '../entities/route-components.token';

import { UsersRouteParam } from '../entities/user-routes.enum';

/*
  Effects to manage the feature's routes by mapping the components which are applied to
  given routes to the actions which should fire upon navigating to them.
*/

@Injectable()
export class UserRoutesEffects {
  routeUserProfilesMain$ = createEffect(() =>
    this.actions$.pipe(
      navigation(this.userProfilesMain, {
        run: (route: ActivatedRouteSnapshot) => {
          return UserProfilesActions.loadUserProfiles();

          // TODO: Fic issue whereby selectors cannot be referenced within the Effects
          // to verify state before reloading list.

          /* return this.store
            .select(UserProfilesSelectors.selectAllUserProfilesLoadded)
            .pipe(
              filter((allLoaded: boolean) => allLoaded !== true),
              map(() => UserProfilesActions.loadUserProfiles())
            ); */
        },

        onError: (route: ActivatedRouteSnapshot, error: any) => {
          // TODO: Nagivate back and / or fire action to deal with routing error.
          console.error('Navigation Error', error, route);
          // throw error;
          return null;
        },
      })
    )
  );

  routeUserProfileEdit$ = createEffect(() =>
    this.actions$.pipe(
      navigation(this.userProfilesEdit, {
        run: (route: ActivatedRouteSnapshot) => {
          const id: string = route.params[UsersRouteParam.ProfileId];
          return UserProfilesActions.loadUserProfile({ id });
        },

        onError: (route: ActivatedRouteSnapshot, error: any) => {
          // TODO: Nagivate back and / or fire action to deal with routing error.
          console.error('Navigation Error', error, route);
          // throw error;
          return null;
        },
      })
    )
  );
  constructor(
    private readonly actions$: Actions,
    @Inject(ROUTE_COMP_USER_PROFILES_MAIN) private userProfilesMain: Type<any>,
    @Inject(ROUTE_COMP_USER_PROFILES_ADD) private userProfilesAdd: Type<any>,
    @Inject(ROUTE_COMP_USER_PROFILES_EDIT) private userProfilesEdit: Type<any>
  ) {}
}
