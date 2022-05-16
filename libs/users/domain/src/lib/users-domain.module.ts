import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UsersEffects } from './+state/users/users.effects';
import { UsersStoreFacade } from './+state/users/users.facade';
import * as fromUsers from './+state/users/users.reducer';
import { UsersManageFacade } from './application/users-manage.facade';

@NgModule({
  imports: [
    CommonModule,
    // StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    // EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [UsersStoreFacade, UsersManageFacade],
})
export class UsersDomainModule {}
