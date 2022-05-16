import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { User } from '../entities/user.model';
import { UserDataService } from '../infrastructure/user.data.service';

@Injectable({ providedIn: 'root' })
export class UsersManageFacade {
  private usersListSubject = new BehaviorSubject<User[]>([]);
  usersList$ = this.usersListSubject.asObservable();

  constructor(private userDataService: UserDataService) {}

  load(): void {
    this.userDataService.load().subscribe({
      next: (usersList) => {
        this.usersListSubject.next(usersList);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }
}
