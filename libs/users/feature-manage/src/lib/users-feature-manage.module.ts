import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDynamicformApiModule } from '@app/shared/dynamicform/api';
import { UsersDomainModule } from '@app/users/domain';

import { UsersListComponent } from './user-list/users-list.component';

const sharedModules = [SharedDynamicformApiModule];
const domainModules = [UsersDomainModule];

@NgModule({
  imports: [CommonModule, ...sharedModules, ...domainModules],
  declarations: [UsersListComponent],
  exports: [UsersListComponent],
})
export class UsersFeatureManageModule {}
