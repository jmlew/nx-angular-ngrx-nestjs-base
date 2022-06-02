import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ROUTE_COMP_USER_PROFILE,
  ROUTE_COMP_USER_PROFILES,
  RouteItemContext,
  RouteItemDataKey,
  RouteItemPath,
  UsersRouteParam,
} from '@app/users/domain';

import { UsersManageProfilesComponent } from './users-manage-profiles/users-manage-profiles.component';
import { UsersUserProfileComponent } from './users-user-profile/users-user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManageProfilesComponent,
  },
  {
    path: RouteItemPath.New,
    data: { [RouteItemDataKey.Context]: RouteItemContext.New },
    component: UsersUserProfileComponent,
  },
  {
    path: `${RouteItemPath.Edit}/:${UsersRouteParam.ProfileId}`,
    data: { [RouteItemDataKey.Context]: RouteItemContext.Edit },
    component: UsersUserProfileComponent,
  },
  {
    path: `${RouteItemPath.View}/:${UsersRouteParam.ProfileId}`,
    data: { [RouteItemDataKey.Context]: RouteItemContext.View },
    component: UsersUserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // Provide the components to map to each route for the router Effects to reference.
  providers: [
    { provide: ROUTE_COMP_USER_PROFILES, useValue: UsersManageProfilesComponent },
    { provide: ROUTE_COMP_USER_PROFILE, useValue: UsersUserProfileComponent },
  ],
})
export class ManageUserProfilesRoutingModule {}
