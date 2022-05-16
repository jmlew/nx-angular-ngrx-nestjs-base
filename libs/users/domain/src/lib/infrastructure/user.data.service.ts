import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GetUsersResponse } from '../entities/user-api.model';

@Injectable()
export class UserDataService {
  baseUrl = 'api/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(this.baseUrl);
  }
}
