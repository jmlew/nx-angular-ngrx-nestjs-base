import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconMat } from '@app/shared/ui-common';
import { RouteItemContext, UserProfile, UserProfileParams } from '@app/users/domain';

/**
 * Temp: hold a reference to form values in enum which will be replaced by a Map of values
 * included in the configs loaded from the server.
 */
export enum ParamKey {
  UserId = 'userId',
  EmailId = 'emailId',
  UserName = 'userName',
  Password = 'password',
  IsLocked = 'isLocked',
  IsInactive = 'isInactive',
  LastLoginDatetime = 'lastLoginDatetime',
  UserRoles = 'userRoles',
}

@Component({
  selector: 'users-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileFormComponent implements OnInit {
  @Input() userProfile: UserProfile;
  @Input() context: RouteItemContext;
  @Output() formSubmit = new EventEmitter<UserProfileParams>();
  @Output() formCancel = new EventEmitter<void>();

  readonly IconMat = IconMat;
  readonly RouteItemContext = RouteItemContext;
  readonly ParamKey = ParamKey;

  form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    const params: UserProfileParams = this.userProfile || this.createUserProfileParams();
    return this.formBuilder.group({
      [ParamKey.UserName]: [
        params[ParamKey.UserName],
        Validators.compose([Validators.required]),
      ],
      [ParamKey.UserId]: [
        params[ParamKey.UserId],
        Validators.compose([Validators.required]),
      ],
      [ParamKey.EmailId]: [
        params[ParamKey.EmailId],
        Validators.compose([Validators.required, Validators.email]),
      ],
      [ParamKey.Password]: [
        params[ParamKey.Password],
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }

  private createUserProfileParams(): UserProfileParams {
    return {
      [ParamKey.UserName]: '',
      [ParamKey.UserId]: '',
      [ParamKey.EmailId]: '',
      [ParamKey.Password]: '',
      [ParamKey.IsLocked]: 'Y',
      [ParamKey.IsInactive]: 'Y',
      [ParamKey.LastLoginDatetime]: '',
      [ParamKey.UserRoles]: [],
    };
  }

  getControl(key: ParamKey): AbstractControl {
    return this.form.get(key) as AbstractControl;
  }

  isControlError(key: ParamKey): boolean {
    const control: AbstractControl = this.getControl(key);
    return control.invalid && control.touched && control.dirty;
  }

  onSubmit() {
    if (this.form.valid) {
      const params: UserProfileParams = this.form.value;
      // const user: User = { ...this.userProfile, ...params };
      this.formSubmit.emit(params);
    }
  }

  onCancel() {
    this.formCancel.emit();
  }
}
