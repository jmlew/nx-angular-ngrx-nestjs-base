import { navigation } from '@nrwl/angular';
import { Store } from '@ngrx/store';
import { filter, first, map, tap } from 'rxjs';
import { Inject, Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserProfilesActions from './profiles/profiles.actions';
import * as UserProfilesSelectors from './profiles/profiles.selectors';

import {
  ROUTE_COMP_USER_PROFILE,
  ROUTE_COMP_USER_PROFILES,
} from '../entities/route-components.token';

import {
  RouteDomainPath,
  RouteItemContext,
  RouteDataType,
  RouteItemPath,
  UsersRouteParam,
} from '../entities/user-routes.enum';

import { UsersFeatureState } from '.';
import { NavigationFacade, RouteItem, RouteName } from '@app/shared/navigation/domain';

/**
 * Effects to manage the feature's routes by mapping the components which are applied to
 * given routes to the actions which should fire upon navigating to them.
 */
@Injectable()
export class UserRoutesEffects {
  routedUserProfilesMain$ = createEffect(() =>
    this.actions$.pipe(
      navigation(this.userProfiles, {
        run: (route: ActivatedRouteSnapshot) => {
          return this.store
            .select(UserProfilesSelectors.selectAreAllUserProfilesLoaded)
            .pipe(
              first(),
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

  routedUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      navigation(this.userProfile, {
        run: (route: ActivatedRouteSnapshot) => {
          /**
           * Only load the current user profile if the route context is to Edit or View
           * and the profile is not already loaded.
           */
          const profileId: string | undefined = route.params[UsersRouteParam.ProfileId];
          if (profileId == null) {
            return;
          }
          const context: RouteItemContext =
            route.data[RouteDataType.Context] || RouteItemContext.None;
          if (context != RouteItemContext.Edit && context != RouteItemContext.View) {
            return;
          }
          return this.store
            .select(UserProfilesSelectors.selectIsCurrentUserProfileLoaded)
            .pipe(
              first(),
              filter((isLoaded: boolean) => !isLoaded),
              map(() => UserProfilesActions.loadUserProfile({ id: profileId }))
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

  navToUserProfiles$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserProfilesActions.navToUserProfiles),
        tap(() => {
          const usersRouteItem: RouteItem = this.navigationFacade.getRootItem(
            RouteName.Users
          );
          this.router.navigate([usersRouteItem.path]);
        })
      ),
    { dispatch: false }
  );

  navToEditUserProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserProfilesActions.navToEditUserProfile),
        tap((action: { id: string }) => {
          const usersRouteItem: RouteItem = this.navigationFacade.getRootItem(
            RouteName.Users
          );
          const routePath = `${usersRouteItem.path}/${RouteDomainPath.Profiles}/${RouteItemPath.Edit}`;
          this.router.navigate([routePath, action.id]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly navigationFacade: NavigationFacade,
    private readonly actions$: Actions,
    private readonly store: Store<UsersFeatureState>,
    private readonly router: Router,
    @Inject(ROUTE_COMP_USER_PROFILES) private userProfiles: Type<any>,
    @Inject(ROUTE_COMP_USER_PROFILE) private userProfile: Type<any>
  ) {}
}
