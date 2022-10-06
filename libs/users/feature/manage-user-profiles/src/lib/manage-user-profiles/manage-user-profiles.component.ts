import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiState, ApiStatus } from '@app/shared/api-status/util';
import {
  ManageUserProfilesFacade,
  RouteItemPath,
  UserProfile,
  getUserProfileId,
} from '@app/users/domain';

@Component({
  templateUrl: './manage-user-profiles.component.html',
  styleUrls: ['./manage-user-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUserProfilesComponent {
  readonly ApiStatus = ApiStatus;
  readonly userProfiles$: Observable<UserProfile[]> =
    this.userProfilesFacade.allUserProfiles$;
  readonly readRequestState$: Observable<ApiState> =
    this.userProfilesFacade.userProfilesReadRequestState$;
  readonly writeRequestState$: Observable<ApiState> =
    this.userProfilesFacade.userProfilesWriteRequestState$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfilesFacade: ManageUserProfilesFacade
  ) {}

  onAdd() {
    this.router.navigate([RouteItemPath.New], { relativeTo: this.route });
  }

  onEdit(profile: UserProfile) {
    const id: string = getUserProfileId(profile);
    this.router.navigate([RouteItemPath.Edit, id], { relativeTo: this.route });
  }

  onView(profile: UserProfile) {
    const id: string = getUserProfileId(profile);
    this.router.navigate([RouteItemPath.View, id], { relativeTo: this.route });
  }

  onRemove(profile: UserProfile) {
    const id: string = getUserProfileId(profile);
    this.userProfilesFacade.deleteUserProfile(id);
  }

  onDismissReadError() {
    this.userProfilesFacade.resetUserProfilesReadState();
  }

  onDismissWriteError() {
    this.userProfilesFacade.resetUserProfilesWriteState();
  }
}
