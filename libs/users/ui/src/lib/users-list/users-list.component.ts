import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconMat } from '@app/shared/ui-common';
import { UserProfile } from '@app/users/domain';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly IconMat = IconMat;

  @Input() users: UserProfile[];
  @Output() edit = new EventEmitter<UserProfile>();
  @Output() view = new EventEmitter<UserProfile>();
  @Output() remove = new EventEmitter<UserProfile>();
}
