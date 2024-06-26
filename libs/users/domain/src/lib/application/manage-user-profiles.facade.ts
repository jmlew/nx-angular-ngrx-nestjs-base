import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiState } from '@app/shared/api-status/util';
import { Store, select } from '@ngrx/store';

import * as UserProfilesActions from '../+state/profiles/profiles.actions';
import * as UserProfilesFeature from '../+state/profiles/profiles.reducer';
import * as UserProfilesSelectors from '../+state/profiles/profiles.selectors';
import { UserProfile, UserProfileParams } from '../entities/user-profile.model';
import { RouteItemContext } from '../entities/user-routes.enum';

/**
 * Application facade which acts as the main point of contact for implementing a specific
 * usecase with the domain's feature components.
 *
 * Only functionality which should be implemented within feature components or exposed
 * through the domain's API module should go here; this facade should not expose methods
 * which are already handled through NgRx Effects within the domain, but should expose the
 * resulting observables to teir consumers, eg. responding to route events to load data
 * and update the store are handled via Effects while the selected data is exposed to
 * other components here.
 *
 * This facade is also the main reference in the optional domain api module which exposes
 * selected functionality to other domains.
 */

@Injectable()
export class ManageUserProfilesFacade {
  userProfilesReadRequestState$: Observable<ApiState> = this.store.pipe(
    select(UserProfilesSelectors.selectUserProfilesReadRequestState)
  );
  userProfilesWriteRequestState$: Observable<ApiState> = this.store.pipe(
    select(UserProfilesSelectors.selectUserProfilesWriteRequestState)
  );
  allUserProfiles$: Observable<UserProfile[]> = this.store.pipe(
    select(UserProfilesSelectors.selectAllUserProfiles)
  );
  currentUserProfile$: Observable<UserProfile | undefined> = this.store.pipe(
    select(UserProfilesSelectors.selectCurrentUserProfile)
  );
  userProfileRouteItemContext$: Observable<RouteItemContext> = this.store.pipe(
    select(UserProfilesSelectors.selectUserProfileRouteItemContext)
  );

  constructor(private readonly store: Store<UserProfilesFeature.UserProfilesState>) {}

  resetUserProfilesReadState() {
    this.store.dispatch(UserProfilesActions.resetUserProfilesReadState());
  }

  resetUserProfilesWriteState() {
    this.store.dispatch(UserProfilesActions.resetUserProfilesWriteState());
  }

  loadUserProfiles() {
    this.store.dispatch(UserProfilesActions.loadUserProfiles());
  }

  createUserProfile(params: UserProfileParams) {
    this.store.dispatch(UserProfilesActions.createUserProfile({ params }));
  }

  updateUserProfile(id: string, params: Partial<UserProfile>) {
    this.store.dispatch(UserProfilesActions.updateUserProfile({ id, params }));
  }

  deleteUserProfile(id: string) {
    this.store.dispatch(UserProfilesActions.deleteUserProfile({ id }));
  }
}
