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
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewUserProfileComponent {
  readonly ApiStatus = ApiStatus;
  readonly RouteItemContext = RouteItemContext;
  readonly readRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesReadRequestState$;
  userProfile$: Observable<UserProfile | undefined> =
    this.userProfilesFacade.currentUserProfile$;

  constructor(
    private userProfilesFacade: ManageUserProfilesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onGoBack() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
