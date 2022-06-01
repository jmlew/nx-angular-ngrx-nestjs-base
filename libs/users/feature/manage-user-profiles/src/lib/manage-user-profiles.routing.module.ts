import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ROUTE_COMP_USER_PROFILES_ADD,
  ROUTE_COMP_USER_PROFILES_EDIT,
  ROUTE_COMP_USER_PROFILES_MAIN,
  UsersRouteParam,
} from '@app/users/domain';

import { UsersCreateProfileComponent } from './users-create-profile/users-create-profile.component';
import { UsersEditProfileComponent } from './users-edit-profile/users-edit-profile.component';
import { UsersManageProfilesComponent } from './users-manage-profiles/users-manage-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManageProfilesComponent,
    // data: { component: UsersManageProfilesComponent.name },
  },
  {
    path: 'add',
    component: UsersCreateProfileComponent,
  },
  {
    path: `:${UsersRouteParam.ProfileId}`,
    component: UsersEditProfileComponent,
    // data: { component: UsersEditProfileComponent.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // Provide the components to map to each route for the router Effects to reference.
  providers: [
    { provide: ROUTE_COMP_USER_PROFILES_MAIN, useValue: UsersManageProfilesComponent },
    { provide: ROUTE_COMP_USER_PROFILES_ADD, useValue: UsersCreateProfileComponent },
    { provide: ROUTE_COMP_USER_PROFILES_EDIT, useValue: UsersEditProfileComponent },
  ],
})
export class ManageUserProfilesRoutingModule {}
