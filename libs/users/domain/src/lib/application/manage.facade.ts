import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../entities/user';
import { UserDataService } from '../infrastructure/user.data.service';

@Injectable({ providedIn: 'root' })
export class ManageFacade {
  private userListSubject = new BehaviorSubject<User[]>([]);
  userList$ = this.userListSubject.asObservable();

  constructor(private userDataService: UserDataService) {}

  load(): void {
    this.userDataService.load().subscribe({
      next: (userList) => {
        this.userListSubject.next(userList);
      },
      error: (err) => {
        console.error('err', err);
      },
    });
  }
}
