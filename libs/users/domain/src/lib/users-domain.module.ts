import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilCommonModule } from '@app/shared/util-common';

import { ManageUserProfilesFacade } from './application/manage-user-profiles.facade';
import { UserDataService } from './infrastructure/user.data.service';

@NgModule({
  imports: [CommonModule, SharedUtilCommonModule],
  providers: [ManageUserProfilesFacade, UserDataService],
})
export class UsersDomainModule {}
