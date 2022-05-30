import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersRouteParam } from '@app/users/domain';

import { UsersCreateProfileComponent } from './users-create-profile/users-create-profile.component';
import { UsersEditProfileComponent } from './users-edit-profile/users-edit-profile.component';
import { UsersManageProfilesComponent } from './users-manage-profiles/users-manage-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManageProfilesComponent,
  },
  {
    path: 'new',
    component: UsersCreateProfileComponent,
  },
  {
    path: `:${UsersRouteParam.ProfileId}`,
    component: UsersEditProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUserProfilesRoutingModule {}
