import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { UsersListComponent } from './users-list/users-list.component';

const sharedModules = [SharedExternalLibrariesModule];

@NgModule({
  imports: [CommonModule, ...sharedModules, RouterModule],
  declarations: [UsersListComponent],
  exports: [UsersListComponent],
})
export class UsersUiModule {}
