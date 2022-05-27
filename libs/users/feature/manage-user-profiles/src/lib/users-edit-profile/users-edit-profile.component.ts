import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiStatus } from '@app/shared/api-status/util';

@Component({
  selector: 'users-users-edit-profile',
  templateUrl: './users-edit-profile.component.html',
  styleUrls: ['./users-edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditProfileComponent implements OnInit {
  readonly ApiStatus = ApiStatus;

  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
