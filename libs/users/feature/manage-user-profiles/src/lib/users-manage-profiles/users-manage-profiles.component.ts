import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
import {
  ManageUserProfilesFacade,
  UserProfile,
  getUserProfileId,
} from '@app/users/domain';

@Component({
  templateUrl: './users-manage-profiles.component.html',
  styleUrls: ['./users-manage-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManageProfilesComponent {
  readonly ApiStatus = ApiStatus;
  readonly userProfiles$: Observable<UserProfile[]> =
    this.userProfilesFacade.userProfiles$;
  readonly userProfilesRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesRequestState$;
  readonly selectAllUserProfilesLoadded$: Observable<boolean> =
    this.userProfilesFacade.selectAllUserProfilesLoadded$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfilesFacade: ManageUserProfilesFacade
  ) {}

  onEdit(item: UserProfile) {
    const id: string = getUserProfileId(item);
    this.router.navigate([id], { relativeTo: this.route });
  }

  onRemove(item: UserProfile) {
    const id: string = getUserProfileId(item);
    console.log('Remove User Profile', id);
  }
}
