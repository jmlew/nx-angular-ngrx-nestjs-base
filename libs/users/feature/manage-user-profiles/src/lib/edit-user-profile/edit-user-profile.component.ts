import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiState, ApiStatus } from '@app/shared/api-status/util';
import {
  ManageUserProfilesFacade,
  RouteItemContext,
  UserProfile,
  getUserProfileId,
} from '@app/users/domain';

@Component({
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserProfileComponent {
  readonly ApiStatus = ApiStatus;
  readonly RouteItemContext = RouteItemContext;
  readonly readRequestState$: Observable<ApiState> =
    this.userProfilesFacade.userProfilesReadRequestState$;
  readonly writeRequestState$: Observable<ApiState> =
    this.userProfilesFacade.userProfilesWriteRequestState$;
  readonly userProfile$: Observable<UserProfile | undefined> =
    this.userProfilesFacade.currentUserProfile$;

  constructor(
    private userProfilesFacade: ManageUserProfilesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onEdit(profile: UserProfile) {
    const id: string = getUserProfileId(profile);
    this.userProfilesFacade.updateUserProfile(id, profile);
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onDismissWriteError() {
    this.userProfilesFacade.resetUserProfilesWriteState();
  }
}
