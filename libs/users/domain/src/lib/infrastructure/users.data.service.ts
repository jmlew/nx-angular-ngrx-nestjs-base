import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { BaseDataService } from '@app/shared/util-http';

import { WriteUserProfileResponse } from '../entities/api/user-profile-api.model';
import { UserProfile, UserProfileParams } from '../entities/user-profile.model';

enum ApiEndpoint {
  Base = 'api',
  Admin = 'admin',
  Profile = 'user_profile',
  Role = 'role',
  Permission = 'permission',
}

export enum DataItemType {
  Profile,
  Role,
  Permission,
}

@Injectable()
export class UsersDataService {
  constructor(private data: BaseDataService) {}

  private baseUrl = `${ApiEndpoint.Base}/${ApiEndpoint.Admin}`;

  private urlMap: Map<DataItemType, string> = new Map([
    [DataItemType.Profile, `${this.baseUrl}/${ApiEndpoint.Profile}`],
    [DataItemType.Role, `${this.baseUrl}/${ApiEndpoint.Role}`],
    [DataItemType.Permission, `${this.baseUrl}/${ApiEndpoint.Permission}`],
  ]);

  private getUrl(type: DataItemType): string {
    return this.urlMap.get(type) as string;
  }

  getItems(type: DataItemType): Observable<UserProfile[]> {
    return this.data.get<UserProfile[]>(this.getUrl(type));
  }

  getItem(type: DataItemType, id: string): Observable<UserProfile> {
    return this.data.get<UserProfile>(`${this.getUrl(type)}/${id}`);
  }

  createItem(
    type: DataItemType,
    item: UserProfileParams
  ): Observable<WriteUserProfileResponse> {
    return this.data.post<WriteUserProfileResponse>(this.getUrl(type), item);
  }

  updateItem(
    type: DataItemType,
    id: string,
    item: Partial<UserProfile>
  ): Observable<WriteUserProfileResponse> {
    return this.data.put<WriteUserProfileResponse>(`${this.getUrl(type)}/${id}`, item);
  }

  deleteItem(type: DataItemType, id: string): Observable<WriteUserProfileResponse> {
    return this.data.delete<WriteUserProfileResponse>(`${this.getUrl(type)}/${id}`);
  }
}
