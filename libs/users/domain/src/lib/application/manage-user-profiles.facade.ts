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
    select(UserProfilesSelectors.selectSelectedUserProfile)
  );

  constructor(
    private userProfilesData: UsersDataService,
    private readonly store: Store<UserProfilesFeature.UserProfilesState>
  ) {}

  loadUserProfiles() {
    this.store.dispatch(UserProfilesActions.loadUserProfiles());
  }

  /* getUserProfiles(): Observable<UserProfile[]> {
    return this.userProfilesData.getProfiles();
  }

  getUserProfile(emailId: string): Observable<UserProfile> {
    return this.userProfilesData.getProfile(emailId);
  }

  createUserProfile(user: UserProfileParams): Observable<EditUserProfileResponse> {
    return this.userProfilesData.createProfile(user);
  }

  updateUserProfile(user: UserProfile): Observable<EditUserProfileResponse> {
    return this.userProfilesData.updateProfile(user);
  }

  deleteUserProfile(emailId: string): Observable<string> {
    return this.userProfilesData.deleteProfile(emailId);
  } */
}
