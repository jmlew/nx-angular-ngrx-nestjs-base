import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { UsersDomainModule } from '@app/users/domain';
import { UsersUiModule } from '@app/users/ui';

import { ManageUserRolesRoutingModule } from './manage-user-roles.routing.module';
import { UsersEditRoleComponent } from './users-edit-role/users-edit-role.component';
import { UsersManageRolesComponent } from './users-manage-roles/users-manage-roles.component';

const sharedModules = [SharedApiStatusUiModule];
const domainModules = [UsersDomainModule, UsersUiModule];

@NgModule({
  imports: [
    CommonModule,
    ...sharedModules,
    ...domainModules,
    ManageUserRolesRoutingModule,
  ],
  declarations: [UsersEditRoleComponent, UsersManageRolesComponent],
})
export class UsersFeatureManageUserRolesModule {}
