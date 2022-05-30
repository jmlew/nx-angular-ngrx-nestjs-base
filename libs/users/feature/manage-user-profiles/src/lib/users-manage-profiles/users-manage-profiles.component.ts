import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
import { ManageUserProfilesFacade, UserProfile } from '@app/users/domain';

@Component({
  selector: 'users-manage-profiles',
  templateUrl: './users-manage-profiles.component.html',
  styleUrls: ['./users-manage-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManageProfilesComponent implements OnInit {
  readonly ApiStatus = ApiStatus;
  readonly userProfiles$: Observable<UserProfile[]> =
    this.userProfilesFacade.userProfiles$;
  readonly userProfilesRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesRequestState$;

  constructor(private userProfilesFacade: ManageUserProfilesFacade) {}

  ngOnInit() {
    this.loadUsers();
  }

  // TODO: move to router state handler and validate persistent state before API call.
  loadUsers(): void {
    this.userProfilesFacade.loadUserProfiles();
  }
}
