import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiExternalLibrariesModule } from '@app/shared-ui-external-libraries';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  imports: [CommonModule, SharedUiExternalLibrariesModule],
  declarations: [UsersListComponent],
  exports: [UsersListComponent],
})
export class UsersUiManageModule {}
