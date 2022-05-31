import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { UsersDomainModule } from '@app/users/domain';
import { UsersUiModule } from '@app/users/ui';

import { ManageUserProfilesRoutingModule } from './manage-user-profiles.routing.module';
import { UsersCreateProfileComponent } from './users-create-profile/users-create-profile.component';
import { UsersEditProfileComponent } from './users-edit-profile/users-edit-profile.component';
import { UsersManageProfilesComponent } from './users-manage-profiles/users-manage-profiles.component';

const sharedModules = [SharedApiStatusUiModule];
const domainModules = [UsersDomainModule, UsersUiModule];

@NgModule({
  imports: [
    CommonModule,
    ...sharedModules,
    ...domainModules,
    ManageUserProfilesRoutingModule,
  ],
  declarations: [
    UsersManageProfilesComponent,
    UsersEditProfileComponent,
    UsersCreateProfileComponent,
  ],
  exports: [
    UsersManageProfilesComponent,
    UsersEditProfileComponent,
    UsersCreateProfileComponent,
  ],
  // Provide components for the injector tokens referenced in Effects.
  // providers: [{ provide: USERS_MANAGE_PROFILES, useValue: UsersManageProfilesComponent }],
})
export class UsersFeatureManageUserProfilesModule {}
