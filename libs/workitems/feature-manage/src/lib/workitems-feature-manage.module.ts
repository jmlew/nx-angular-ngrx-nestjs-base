import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { WorkitemsDomainModule } from '@app/workitems/domain';
import { WorkitemsUiManageModule } from '@app/workitems/ui-manage';

import { UsersFeatureManageUserProfilesRoutingModule } from './workitems-feature-manage.routing.module';
import { WorkitemsManageComponent } from './workitems-manage/workitems-manage.component';

const sharedModules = [SharedApiStatusUiModule, SharedExternalLibrariesModule];
const domainModules = [WorkitemsDomainModule, WorkitemsUiManageModule];

@NgModule({
  imports: [
    CommonModule,
    ...sharedModules,
    ...domainModules,
    UsersFeatureManageUserProfilesRoutingModule,
  ],
  declarations: [WorkitemsManageComponent],
  exports: [],
})
export class WorkitemsFeatureManageModule {}
