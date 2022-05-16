import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { GetUsersResponse, User } from '../entities/user-api.model';
import { UserDataService } from '../infrastructure/user.data.service';

@Injectable()
export class UsersManageFacade {
  private usersListSubject = new BehaviorSubject<User[]>([]);
  usersList$ = this.usersListSubject.asObservable();

  constructor(private userDataService: UserDataService) {}

  load(): void {
    this.userDataService.getUsers().subscribe({
      next: (response: GetUsersResponse) => {
        this.usersListSubject.next(response.data);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }
}
