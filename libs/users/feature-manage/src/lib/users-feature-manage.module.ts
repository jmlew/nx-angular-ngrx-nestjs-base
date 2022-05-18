import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { SharedDynamicformApiModule } from '@app/shared/dynamicform/api';
import { UsersDomainModule } from '@app/users/domain';
import { UsersUiManageModule } from '@app/users/ui-manage';

import { UsersFeatureManageRoutingModule } from './users-feature-manage-routing.module';
import { UsersManageComponent } from './users-manage/users-manage.component';

const sharedModules = [SharedDynamicformApiModule, SharedApiStatusUiModule];
const domainModules = [UsersDomainModule, UsersUiManageModule];

@NgModule({
  imports: [
    CommonModule,
    ...sharedModules,
    ...domainModules,
    UsersFeatureManageRoutingModule,
  ],
  declarations: [UsersManageComponent],
  exports: [UsersManageComponent],
})
export class UsersFeatureManageModule {}
