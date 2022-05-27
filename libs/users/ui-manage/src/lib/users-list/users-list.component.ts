import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconMat } from '@app/shared/ui-common';
import { User } from '@app/users/domain';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  IconMat = IconMat;

  @Input() users: User[];
  @Output() edit = new EventEmitter<User>();
  @Output() remove = new EventEmitter<number>();
}
