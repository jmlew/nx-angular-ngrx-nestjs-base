import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { BaseDataService } from '@app/shared/util-http';

import { UpdateUserProfileResponse } from '../entities/api/user-profile-api.model';
import { UserProfile, UserProfileParams } from '../entities/user-profile.model';

enum ApiEndpoint {
  Base = 'api',
  Admin = 'admin',
  Profile = 'user_profile',
  Role = 'role',
  Permission = 'permission',
}

@Injectable()
export class UsersDataService {
  private baseUrlProfile = `${ApiEndpoint.Base}/${ApiEndpoint.Admin}/${ApiEndpoint.Profile}`;
  private baseUrlRole = `${ApiEndpoint.Base}/${ApiEndpoint.Admin}/${ApiEndpoint.Role}`;
  private baseUrlPermission = `${ApiEndpoint.Base}/${ApiEndpoint.Admin}/${ApiEndpoint.Permission}`;

  constructor(private data: BaseDataService) {}

  getProfiles(): Observable<UserProfile[]> {
    return this.data.get<UserProfile[]>(this.baseUrlProfile);
  }

  getProfile(id: string): Observable<UserProfile> {
    return this.data.get<UserProfile>(`${this.baseUrlProfile}/${id}`);
  }

  createProfile(user: UserProfileParams): Observable<UpdateUserProfileResponse> {
    return this.data.post<UpdateUserProfileResponse>(this.baseUrlProfile, user);
  }

  updateProfile(user: UserProfile): Observable<UpdateUserProfileResponse> {
    return this.data.put<UpdateUserProfileResponse>(
      `${this.baseUrlProfile}/${user.userId}`,
      user
    );
  }

  deleteProfile(id: string): Observable<string> {
    return this.data.delete<string>(`${this.baseUrlProfile}/${id}`);
  }
}
