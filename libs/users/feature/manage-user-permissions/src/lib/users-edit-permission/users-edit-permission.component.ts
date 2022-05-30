import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-edit-permission',
  templateUrl: './users-edit-permission.component.html',
  styleUrls: ['./users-edit-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersEditPermissionComponent implements OnInit {
  ngOnInit(): void {
    console.log('ngOnInit');
  }
}