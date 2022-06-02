import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
import {
  ManageUserProfilesFacade,
  RouteItemContext,
  UserProfile,
  getUserProfileId,
} from '@app/users/domain';

@Component({
  templateUrl: './users-user-profile.component.html',
  styleUrls: ['./users-user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersUserProfileComponent {
  readonly ApiStatus = ApiStatus;
  readonly RouteItemContext = RouteItemContext;
  readonly requestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesRequestState$;
  userProfile$: Observable<UserProfile | undefined> =
    this.userProfilesFacade.currentUserProfile$;
  routeItemContext$: Observable<RouteItemContext> =
    this.userProfilesFacade.userProfileRouteItemContext$;

  constructor(private userProfilesFacade: ManageUserProfilesFacade) {}

  onCreate(profile: UserProfile) {
    this.userProfilesFacade.createUserProfile(profile);
  }

  onEdit(profile: UserProfile) {
    const id: string = getUserProfileId(profile);
    this.userProfilesFacade.updateUserProfile(id, profile);
  }
}
