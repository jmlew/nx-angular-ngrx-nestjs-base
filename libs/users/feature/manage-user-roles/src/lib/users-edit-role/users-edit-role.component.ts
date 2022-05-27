import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-edit-role',
  templateUrl: './users-edit-role.component.html',
  styleUrls: ['./users-edit-role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditRoleComponent implements OnInit {
  ngOnInit(): void {
    console.log('ngOnInit');
  }
}
