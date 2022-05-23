import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedApiStatusUiModule } from '@app/shared/api-status/ui';
import { WorkitemsDomainModule } from '@app/workitems/domain';

import { ManageComponent } from './manage.component';
import { UsersFeatureManageRoutingModule } from './workitems-feature-manage-routing.module';

const sharedModules = [SharedApiStatusUiModule];
const domainModules = [WorkitemsDomainModule];

@NgModule({
  imports: [
    CommonModule,
    ...sharedModules,
    ...domainModules,
    UsersFeatureManageRoutingModule,
  ],
  declarations: [ManageComponent],
  exports: [ManageComponent],
})
export class WorkitemsFeatureManageModule {}
