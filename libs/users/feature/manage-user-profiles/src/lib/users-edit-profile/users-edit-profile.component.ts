import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
import { ManageUserProfilesFacade, UserProfile } from '@app/users/domain';

@Component({
  templateUrl: './users-edit-profile.component.html',
  styleUrls: ['./users-edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditProfileComponent implements OnInit {
  readonly ApiStatus = ApiStatus;
  selectedUserProfile$: Observable<UserProfile | undefined> =
    this.userProfilesFacade.selectedUserProfile$;
  selectedUserProfileId$: Observable<string | undefined> =
    this.userProfilesFacade.selectedUserProfileId$;
  readonly userProfilesRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesRequestState$;

  constructor(private userProfilesFacade: ManageUserProfilesFacade) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.selectedUserProfile$.subscribe((profile: UserProfile | undefined) => {
      console.log('selected profile', profile);
    });
    this.selectedUserProfileId$.subscribe((id: string | undefined) => {
      console.log('selected profile ID', id);
    });
  }
}
