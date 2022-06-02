import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconMat } from '@app/shared/ui-common';
import { RouteItemContext, UserProfile } from '@app/users/domain';

@Component({
  selector: 'users-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileFormComponent {
  readonly IconMat = IconMat;
  readonly RouteItemContext = RouteItemContext;

  @Input() userProfile: UserProfile;
  @Input() context: RouteItemContext;
  @Output() formSubmit = new EventEmitter<UserProfile>();
}
