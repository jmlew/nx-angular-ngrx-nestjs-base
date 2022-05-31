import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiRequestState } from '@app/shared/api-status/util';
import { Store, select } from '@ngrx/store';

import * as UserProfilesActions from '../+state/profiles/profiles.actions';
import * as UserProfilesFeature from '../+state/profiles/profiles.reducer';
import * as UserProfilesSelectors from '../+state/profiles/profiles.selectors';
import { UserProfile } from '../entities/user-profile.model';
import { UsersDataService } from '../infrastructure/users.data.service';

@Injectable()
export class ManageUserProfilesFacade {
  userProfilesRequestState$: Observable<ApiRequestState> = this.store.pipe(
    select(UserProfilesSelectors.selectUserProfilesRequestState)
  );
  userProfiles$: Observable<UserProfile[]> = this.store.pipe(
    select(UserProfilesSelectors.selectAllUserProfiles)
  );
  selectedUserProfile$: Observable<UserProfile | undefined> = this.store.pipe(
    select(UserProfilesSelectors.selectCurrentUserProfile)
  );
  selectAllUserProfilesLoadded$: Observable<boolean> = this.store.pipe(
    select(UserProfilesSelectors.selectAllUserProfilesLoadded)
  );

  constructor(
    private readonly store: Store<UserProfilesFeature.UserProfilesState>,
    private dataService: UsersDataService
  ) {}

  loadUserProfiles() {
    this.store.dispatch(UserProfilesActions.loadUserProfiles());
  }

  deleteUserProfile(id: string) {
    this.store.dispatch(UserProfilesActions.deleteUserProfile({ id }));
  }

  /* getUserProfiles(): Observable<UserProfile[]> {
    return this.dataService.getProfiles();
  }

  getUserProfile(emailId: string): Observable<UserProfile> {
    return this.dataService.getProfile(emailId);
  }

  createUserProfile(user: UserProfileParams): Observable<EditUserProfileResponse> {
    return this.dataService.createProfile(user);
  }

  updateUserProfile(user: UserProfile): Observable<EditUserProfileResponse> {
    return this.dataService.updateProfile(user);
  }

  deleteUserProfile(emailId: string): Observable<string> {
    return this.dataService.deleteProfile(emailId);
  } */
}
