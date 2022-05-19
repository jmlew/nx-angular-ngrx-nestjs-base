import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as fromApiStatus from '@app/shared/api-status/util';
import { User } from '@app/users/domain';

import { UsersStore } from './users.store';

@Component({
  selector: 'users-manage-profiles',
  templateUrl: './users-manage-profiles.component.html',
  styleUrls: ['./users-manage-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersStore],
})
export class UsersManageProfilesComponent implements OnInit {
  readonly ApiStatus = fromApiStatus.ApiStatus;
  readonly allUsers$: Observable<User[]> = this.usersStore.allUsers$;
  readonly usersRequestState$: Observable<fromApiStatus.ApiRequestState> =
    this.usersStore.usersRequestState$;

  constructor(private usersStore: UsersStore) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersStore.loadAllUsers();
  }
}
