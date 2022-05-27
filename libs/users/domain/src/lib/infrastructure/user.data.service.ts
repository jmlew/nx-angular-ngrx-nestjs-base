import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { BaseDataService } from '@app/shared/util-http';

import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserParams,
} from '../entities/user-api.model';

enum ApiEndpoint {
  Base = 'api',
  Users = 'users',
}

@Injectable()
export class UserDataService {
  private baseUrl = `${ApiEndpoint.Base}/${ApiEndpoint.Users}`;

  constructor(private data: BaseDataService) {}

  getAllUsers(): Observable<User[]> {
    return this.data
      .get<GetUsersResponse>(this.baseUrl)
      .pipe(map((response: GetUsersResponse) => response.data));
  }

  getUserById(id: number): Observable<User> {
    return this.data
      .get<GetUserResponse>(`${this.baseUrl}/${id}`)
      .pipe(map((response: GetUserResponse) => response.data));
  }

  createUser(user: UserParams): Observable<CreateUserResponse> {
    return this.data.post<CreateUserResponse>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<UpdateUserResponse> {
    return this.data.put<UpdateUserResponse>(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<number> {
    return this.data.delete<number>(`${this.baseUrl}/${id}`);
  }

  deleteUsers(ids: number[]): Observable<number[]> {
    return this.data.deleteMany<number[]>(this.baseUrl, ids);
  }
}
