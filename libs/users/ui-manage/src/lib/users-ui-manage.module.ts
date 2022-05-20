import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { UsersListComponent } from './users-list/users-list.component';

const sharedModules = [SharedExternalLibrariesModule];

@NgModule({
  imports: [CommonModule, ...sharedModules],
  declarations: [UsersListComponent],
  exports: [UsersListComponent],
})
export class UsersUiManageModule {}
