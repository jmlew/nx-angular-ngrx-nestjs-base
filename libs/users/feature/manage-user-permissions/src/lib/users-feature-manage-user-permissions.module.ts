import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { UsersDomainModule } from '@app/users/domain';
import { UsersUiModule } from '@app/users/ui';

import { ManageUserPermissionsRoutingModule } from './manage-user-permissions.routing.module';
import { UsersEditPermissionComponent } from './users-edit-permission/users-edit-permission.component';
import { UsersManagePermissionsComponent } from './users-manage-permissions/users-manage-permissions.component';

const sharedModules = [SharedApiStatusUiModule];
const domainModules = [UsersDomainModule, UsersUiModule];

@NgModule({
  imports: [
    CommonModule,
    ...sharedModules,
    ...domainModules,
    ManageUserPermissionsRoutingModule,
  ],
  declarations: [UsersEditPermissionComponent, UsersManagePermissionsComponent],
})
export class UsersFeatureManageUserPermissionsModule {}
