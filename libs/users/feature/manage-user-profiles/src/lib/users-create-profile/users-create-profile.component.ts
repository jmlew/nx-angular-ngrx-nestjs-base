import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiStatus } from '@app/shared/api-status/util';

@Component({
  templateUrl: './users-create-profile.component.html',
  styleUrls: ['./users-create-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCreateProfileComponent implements OnInit {
  readonly ApiStatus = ApiStatus;

  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
