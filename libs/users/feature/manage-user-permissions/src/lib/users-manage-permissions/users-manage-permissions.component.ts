import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-manage-permissions',
  templateUrl: './users-manage-permissions.component.html',
  styleUrls: ['./users-manage-permissions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManagePermissionsComponent implements OnInit {
  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
