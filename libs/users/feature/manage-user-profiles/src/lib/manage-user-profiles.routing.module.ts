import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersEditProfileComponent } from './users-edit-profile/users-edit-profile.component';
import { UsersManageProfilesComponent } from './users-manage-profiles/users-manage-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManageProfilesComponent,
  },
  {
    path: 'foo',
    component: UsersManageProfilesComponent,
  },
  {
    path: ':id',
    component: UsersEditProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUserProfilesRoutingModule {}
