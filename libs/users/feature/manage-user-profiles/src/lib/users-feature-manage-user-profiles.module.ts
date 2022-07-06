import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { SharedDynamicformApiModule } from '@app/shared/dynamicform/api';
import { UsersDomainModule } from '@app/users/domain';
import { UsersUiModule } from '@app/users/ui';
import { ReactiveComponentModule } from '@ngrx/component';

import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ManageUserProfilesRoutingModule } from './manage-user-profiles.routing.module';
import { ManageUserProfilesComponent } from './manage-user-profiles/manage-user-profiles.component';
import { NewUserProfileComponent } from './new-user-profile/new-user-profile.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';

const sharedModules = [SharedApiStatusUiModule, SharedDynamicformApiModule];
const domainModules = [UsersDomainModule, UsersUiModule];

@NgModule({
  imports: [
    CommonModule,
    ReactiveComponentModule,
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
