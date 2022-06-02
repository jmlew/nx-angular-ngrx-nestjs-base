import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { UsersListComponent } from './users-list/users-list.component';

const sharedModules = [SharedExternalLibrariesModule];

@NgModule({
  imports: [CommonModule, ...sharedModules, RouterModule],
  declarations: [UsersListComponent, UserProfileFormComponent],
  exports: [UsersListComponent, UserProfileFormComponent],
})
export class UsersUiModule {}
