import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
import {
  ManageUserProfilesFacade,
  RouteItemContext,
  UserProfile,
} from '@app/users/domain';

@Component({
  templateUrl: './new-user-profile.component.html',
  styleUrls: ['./new-user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserProfileComponent {
  readonly ApiStatus = ApiStatus;
  readonly RouteItemContext = RouteItemContext;
  readonly readRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesReadRequestState$;
  readonly writeRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesWriteRequestState$;
  userProfile$: Observable<UserProfile | undefined> =
    this.userProfilesFacade.currentUserProfile$;

  constructor(
    private userProfilesFacade: ManageUserProfilesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onCreate(profile: UserProfile) {
    this.userProfilesFacade.createUserProfile(profile);
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onDismissWriteError() {
    this.userProfilesFacade.resetUserProfilesWriteState();
  }
}
