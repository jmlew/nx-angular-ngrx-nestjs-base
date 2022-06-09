import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { HeaderTitleComponent } from './header-title/header-title.component';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { UsersListComponent } from './users-list/users-list.component';

const sharedModules = [SharedExternalLibrariesModule];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...sharedModules],
  declarations: [UsersListComponent, UserProfileFormComponent, HeaderTitleComponent],
  exports: [UsersListComponent, UserProfileFormComponent, HeaderTitleComponent],
})
export class UsersUiModule {}
