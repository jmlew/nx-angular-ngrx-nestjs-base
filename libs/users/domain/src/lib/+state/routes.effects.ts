import { navigation } from '@nrwl/angular';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { Inject, Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserProfilesActions from './profiles/profiles.actions';
import * as UserProfilesSelectors from './profiles/profiles.selectors';

import {
  ROUTE_COMP_USER_PROFILES_ADD,
  ROUTE_COMP_USER_PROFILES_EDIT,
  ROUTE_COMP_USER_PROFILES_MAIN,
} from '../entities/route-components.token';

import { UsersRouteParam } from '../entities/user-routes.enum';

import { UsersFeatureState } from '.';
import { UserProfile } from '../entities/user-profile.model';

/**
 * Effects to manage the feature's routes by mapping the components which are applied to
 * given routes to the actions which should fire upon navigating to them.
 */
@Injectable()
export class UserRoutesEffects {
  routeUserProfilesMain$ = createEffect(() =>
    this.actions$.pipe(
      navigation(this.userProfilesMain, {
        run: (route: ActivatedRouteSnapshot) => {
          return this.store
            .select(UserProfilesSelectors.selectAllUserProfilesLoadded)
            .pipe(
              filter((allLoaded: boolean) => !allLoaded),
              map(() => UserProfilesActions.loadUserProfiles())
            );
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
          // TODO: Check if profile is already loaded via params before router resolves..
          return this.store.select(UserProfilesSelectors.selectCurrentUserProfile).pipe(
            filter((current: UserProfile | undefined) => current == null),
            map(() => UserProfilesActions.loadUserProfile({ id }))
          );
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
    private readonly store: Store<UsersFeatureState>,
    @Inject(ROUTE_COMP_USER_PROFILES_MAIN) private userProfilesMain: Type<any>,
    @Inject(ROUTE_COMP_USER_PROFILES_ADD) private userProfilesAdd: Type<any>,
    @Inject(ROUTE_COMP_USER_PROFILES_EDIT) private userProfilesEdit: Type<any>
  ) {}
}
