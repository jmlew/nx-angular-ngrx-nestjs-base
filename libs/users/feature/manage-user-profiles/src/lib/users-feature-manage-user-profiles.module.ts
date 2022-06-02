import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { UsersDomainModule } from '@app/users/domain';
import { UsersUiModule } from '@app/users/ui';
import { ReactiveComponentModule } from '@ngrx/component';

import { ManageUserProfilesRoutingModule } from './manage-user-profiles.routing.module';
import { UsersManageProfilesComponent } from './users-manage-profiles/users-manage-profiles.component';
import { UsersUserProfileComponent } from './users-user-profile/users-user-profile.component';

const sharedModules = [SharedApiStatusUiModule];
const domainModules = [UsersDomainModule, UsersUiModule];

@NgModule({
  imports: [
    CommonModule,
    ReactiveComponentModule,
    ...sharedModules,
    ...domainModules,
    ManageUserProfilesRoutingModule,
  ],
  declarations: [UsersManageProfilesComponent, UsersUserProfileComponent],
  exports: [UsersManageProfilesComponent, UsersUserProfileComponent],
})
export class UsersFeatureManageUserProfilesModule {}
