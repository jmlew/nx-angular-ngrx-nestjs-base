import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@app/users/domain';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input() users: User[];
}
