import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { EditUserProfileResponse } from '../entities/api/user-profile-api.model';
import { UserProfile, UserProfileParams } from '../entities/user-profile.model';
import { UsersDataService } from '../infrastructure/users.data.service';

// TODO: Convert to state management facade, similar to that of Workitems.
//
@Injectable()
export class ManageUserProfilesFacade {
  constructor(private userProfilesData: UsersDataService) {}

  getUserProfiles(): Observable<UserProfile[]> {
    return this.userProfilesData.getProfiless();
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
  }
}
