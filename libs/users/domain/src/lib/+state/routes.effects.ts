import { navigation } from '@nrwl/angular';
import { Store } from '@ngrx/store';
import { filter, first, map, Observable, of, tap } from 'rxjs';
import { Inject, Injectable, Type } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserProfilesActions from './profiles/profiles.actions';
import * as UserProfilesSelectors from './profiles/profiles.selectors';

import {
  ROUTE_COMP_EDIT_USER_PROFILE,
  ROUTE_COMP_NEW_USER_PROFILE,
  ROUTE_COMP_USER_PROFILES,
  ROUTE_COMP_VIEW_USER_PROFILE,
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
        run: () => {
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

  routedEditUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      navigation(this.editUserProfile, {
        run: (route: ActivatedRouteSnapshot) => {
          const id: string | undefined = route.params[UsersRouteParam.ProfileId];
          if (id == null) {
            return;
          }
          return this.ifCurrentUserProfileNotLoaded().pipe(
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

  routedViewUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      navigation(this.viewUserProfile, {
        run: (route: ActivatedRouteSnapshot) => {
          const id: string | undefined = route.params[UsersRouteParam.ProfileId];
          if (id == null) {
            return;
          }
          return this.ifCurrentUserProfileNotLoaded().pipe(
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

  private ifCurrentUserProfileNotLoaded(): Observable<boolean> {
    return this.store.select(UserProfilesSelectors.selectIsCurrentUserProfileLoaded).pipe(
      first(),
      filter((isLoaded: boolean) => !isLoaded)
    );
  }

  constructor(
    private readonly navigationFacade: NavigationFacade,
    private readonly actions$: Actions,
    private readonly store: Store<UsersFeatureState>,
    private readonly router: Router,
    @Inject(ROUTE_COMP_USER_PROFILES) private userProfiles: Type<any>,
    @Inject(ROUTE_COMP_NEW_USER_PROFILE) private newUserProfile: Type<any>,
    @Inject(ROUTE_COMP_EDIT_USER_PROFILE) private editUserProfile: Type<any>,
    @Inject(ROUTE_COMP_VIEW_USER_PROFILE) private viewUserProfile: Type<any>
  ) {}
}
