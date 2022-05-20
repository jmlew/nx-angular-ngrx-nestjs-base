import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { UsersDomainModule } from '@app/users/domain';
import { UsersUiManageModule } from '@app/users/ui-manage';

import { UsersFeatureManageRoutingModule } from './users-feature-manage-routing.module';
import { UsersManageProfilesComponent } from './users-manage-profiles/users-manage-profiles.component';

const sharedModules = [SharedApiStatusUiModule];
const domainModules = [UsersDomainModule, UsersUiManageModule];

@NgModule({
  imports: [
    CommonModule,
    ...sharedModules,
    ...domainModules,
    UsersFeatureManageRoutingModule,
  ],
  declarations: [UsersManageProfilesComponent],
  exports: [UsersManageProfilesComponent],
})
export class UsersFeatureManageModule {}
