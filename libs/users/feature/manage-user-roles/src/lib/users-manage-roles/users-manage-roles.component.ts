import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-manage-roles',
  templateUrl: './users-manage-roles.component.html',
  styleUrls: ['./users-manage-roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManageRolesComponent implements OnInit {
  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
