import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { IconMat } from '@app/shared/ui-common';
import { RouteItemContext, UserProfile, UserProfileParams } from '@app/users/domain';

export enum ParamKey {
  UserId = 'userId',
  EmailId = 'emailId',
  UserName = 'userName',
  Password = 'password',
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

  isNew: boolean;
  isView: boolean;
  form: UntypedFormGroup;

  constructor(private readonly formBuilder: UntypedFormBuilder) {}

  ngOnInit() {
    this.isNew = this.context === RouteItemContext.New;
    this.isView = this.context === RouteItemContext.View;
    this.form = this.buildForm();
    if (this.isView) {
      this.form.disable();
    }
  }

  private buildForm(): UntypedFormGroup {
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
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  private createUserProfileParams(): UserProfileParams {
    return {
      [ParamKey.UserName]: '',
      [ParamKey.UserId]: '',
      [ParamKey.EmailId]: '',
      [ParamKey.Password]: '',
    };
  }

  getControl(key: ParamKey): AbstractControl {
    return this.form.get(key) as AbstractControl;
  }

  isControlInvalid(key: ParamKey): boolean {
    const control: AbstractControl = this.getControl(key);
    return control.invalid && control.touched && control.dirty;
  }

  isControlError(key: ParamKey, errorType: string): boolean {
    const control: AbstractControl = this.getControl(key);
    return control?.errors?.[errorType];
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
