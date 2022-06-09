import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ROUTE_COMP_EDIT_USER_PROFILE,
  ROUTE_COMP_NEW_USER_PROFILE,
  ROUTE_COMP_USER_PROFILES,
  ROUTE_COMP_VIEW_USER_PROFILE,
  RouteDataType,
  RouteItemContext,
  RouteItemPath,
  UsersRouteParam,
} from '@app/users/domain';

import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ManageUserProfilesComponent } from './manage-user-profiles/manage-user-profiles.component';
import { NewUserProfileComponent } from './new-user-profile/new-user-profile.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: ManageUserProfilesComponent,
  },
  {
    path: RouteItemPath.New,
    data: { [RouteDataType.Context]: RouteItemContext.New },
    component: NewUserProfileComponent,
  },
  {
    path: `${RouteItemPath.Edit}/:${UsersRouteParam.ProfileId}`,
    data: { [RouteDataType.Context]: RouteItemContext.Edit },
    component: EditUserProfileComponent,
  },
  {
    path: `${RouteItemPath.View}/:${UsersRouteParam.ProfileId}`,
    data: { [RouteDataType.Context]: RouteItemContext.View },
    component: ViewUserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // Provide the components to map to each route for the router Effects to reference.
  providers: [
    { provide: ROUTE_COMP_USER_PROFILES, useValue: ManageUserProfilesComponent },
    { provide: ROUTE_COMP_NEW_USER_PROFILE, useValue: NewUserProfileComponent },
    { provide: ROUTE_COMP_EDIT_USER_PROFILE, useValue: EditUserProfileComponent },
    { provide: ROUTE_COMP_VIEW_USER_PROFILE, useValue: ViewUserProfileComponent },
  ],
})
export class ManageUserProfilesRoutingModule {}
