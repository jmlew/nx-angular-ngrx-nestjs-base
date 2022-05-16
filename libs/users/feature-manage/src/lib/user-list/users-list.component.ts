import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersManageFacade } from '@example-app/users/domain';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  usersList$ = this.usersManageFacade.usersList$;

  constructor(private usersManageFacade: UsersManageFacade) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.usersManageFacade.load();
  }
}
