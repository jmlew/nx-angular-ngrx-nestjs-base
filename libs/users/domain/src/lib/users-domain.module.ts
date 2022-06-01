import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilHttpModule } from '@app/shared/util-http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromUsers from './+state';
import { ManageUserProfilesFacade } from './application/manage-user-profiles.facade';
import { UsersDataService } from './infrastructure/users.data.service';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilHttpModule,
    StoreModule.forFeature(fromUsers.USER_FEATURE_KEY, fromUsers.usersReducers),
    EffectsModule.forFeature(fromUsers.usersEffects),
  ],
  providers: [ManageUserProfilesFacade, UsersDataService],
  exports: [],
})
export class UsersDomainModule {}
