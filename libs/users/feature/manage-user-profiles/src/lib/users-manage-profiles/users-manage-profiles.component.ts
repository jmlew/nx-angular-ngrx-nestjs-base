import { Observable, of } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ApiRequestState,
  ApiStatus,
  getApiStatusSuccess,
} from '@app/shared/api-status/util';
import { ManageUserProfilesFacade, UserProfile } from '@app/users/domain';

// TODO: Add NgRX to Facade and handle in each feature controller.

@Component({
  selector: 'users-manage-profiles',
  templateUrl: './users-manage-profiles.component.html',
  styleUrls: ['./users-manage-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManageProfilesComponent implements OnInit {
  readonly allUsers$: Observable<UserProfile[]> =
    this.userProfilesFacade.getUserProfiles();
  readonly usersRequestState$: Observable<ApiRequestState> = of(getApiStatusSuccess());

  readonly ApiStatus = ApiStatus;

  constructor(private userProfilesFacade: ManageUserProfilesFacade) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    // TODO: Add NgRX and call load all users action.
    // this.usersStore.loadAllUsers();
  }
}
