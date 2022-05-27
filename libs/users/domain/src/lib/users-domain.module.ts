import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilHttpModule } from '@app/shared/util-http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';

import { UserProfilesEffects } from './+state/profiles/profiles.effects';
import * as fromUserProfiles from './+state/profiles/profiles.reducer';
import { ManageUserProfilesFacade } from './application/manage-user-profiles.facade';
import { UsersDataService } from './infrastructure/users.data.service';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilHttpModule,
    StoreModule.forFeature(
      fromUserProfiles.USER_PROFILES_FEATURE_KEY,
      fromUserProfiles.reducer
    ),
    EffectsModule.forFeature([UserProfilesEffects]),
  ],
  providers: [ManageUserProfilesFacade, UsersDataService, DataPersistence],
})
export class UsersDomainModule {}
