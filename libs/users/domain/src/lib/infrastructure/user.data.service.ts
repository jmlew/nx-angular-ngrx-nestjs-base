import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../entities/user';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  constructor(private http: HttpClient) {}

  load(): Observable<User[]> {
    const url = 'api/users';
    return this.http.get<User[]>(url);
  }
}
