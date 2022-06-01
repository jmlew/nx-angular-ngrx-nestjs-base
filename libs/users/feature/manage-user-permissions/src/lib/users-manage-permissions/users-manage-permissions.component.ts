import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './users-manage-permissions.component.html',
  styleUrls: ['./users-manage-permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManagePermissionsComponent implements OnInit {
  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
