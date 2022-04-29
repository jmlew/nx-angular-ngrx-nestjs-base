import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersDomainModule } from '@example-app/users/domain';

import { ManageComponent } from './manage.component';

@NgModule({
  imports: [CommonModule, UsersDomainModule],
  declarations: [ManageComponent],
  exports: [ManageComponent],
})
export class UsersFeatureManageModule {}
