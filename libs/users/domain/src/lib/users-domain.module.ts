import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilHttpModule } from '@app/shared/util-http';

import { ManageUserProfilesFacade } from './application/manage-user-profiles.facade';
import { UserDataService } from './infrastructure/user.data.service';

@NgModule({
  imports: [CommonModule, SharedUtilHttpModule],
  providers: [ManageUserProfilesFacade, UserDataService],
})
export class UsersDomainModule {}
