import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiStatus } from '@app/shared/api-status/util';
import { UserProfile } from '@app/users/api-model';
import { ManageUserProfilesFacade } from '@app/users/domain';

@Component({
  selector: 'users-users-edit-profile',
  templateUrl: './users-edit-profile.component.html',
  styleUrls: ['./users-edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditProfileComponent implements OnInit {
  readonly ApiStatus = ApiStatus;
  selectedUserProfile$: Observable<UserProfile | undefined> =
    this.userProfilesFacade.selectedUserProfile$;

  constructor(private userProfilesFacade: ManageUserProfilesFacade) {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
