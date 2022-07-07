import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
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
  readonly readRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesReadRequestState$;
  readonly writeRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesWriteRequestState$;
  readonly userProfile$: Observable<UserProfile | undefined> =
    this.userProfilesFacade.currentUserProfile$;

  constructor(
    private userProfilesFacade: ManageUserProfilesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onEdit(data: unknown) {
    const profile: UserProfile = data as UserProfile;
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
