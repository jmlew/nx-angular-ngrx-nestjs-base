import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { UsersDomainModule } from '@app/users/domain';
import { UsersUiModule } from '@app/users/ui';

import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ManageUserProfilesRoutingModule } from './manage-user-profiles.routing.module';
import { ManageUserProfilesComponent } from './manage-user-profiles/manage-user-profiles.component';
import { NewUserProfileComponent } from './new-user-profile/new-user-profile.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';

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
    NewUserProfileComponent,
    EditUserProfileComponent,
    ViewUserProfileComponent,
    ManageUserProfilesComponent,
  ],
  exports: [
    NewUserProfileComponent,
    EditUserProfileComponent,
    ViewUserProfileComponent,
    ManageUserProfilesComponent,
  ],
})
export class UsersFeatureManageUserProfilesModule {}
