import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersManageProfilesComponent } from './users-manage-profiles/users-manage-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManageProfilesComponent,
  },
  {
    path: '/:id',
    component: UsersManageProfilesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersFeatureManageRoutingModule {}
