import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {
  CreateUserResponse,
  UpdateUserResponse,
  User,
  UserParams,
} from '../entities/user-api.model';
import { UserDataService } from '../infrastructure/user.data.service';

/* Facade to provides an API to expose functionality for the usecase of managing users. */

@Injectable()
export class ManageUserProfilesFacade {
  constructor(private userDataService: UserDataService) {}

  getAllUsers(): Observable<User[]> {
    return this.userDataService.getAllUsers();
  }

  getUserById(id: number): Observable<User> {
    return this.userDataService.getUserById(id);
  }

  createUser(user: UserParams): Observable<CreateUserResponse> {
    return this.userDataService.createUser(user);
  }

  updateUser(user: User): Observable<UpdateUserResponse> {
    return this.userDataService.updateUser(user);
  }

  deleteUser(id: number): Observable<number> {
    return this.userDataService.deleteUser(id);
  }
}
