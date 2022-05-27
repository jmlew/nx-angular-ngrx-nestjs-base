import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkitemsManageComponent } from './workitems-manage/workitems-manage.component';

const routes: Routes = [
  {
    path: '',
    component: WorkitemsManageComponent,
  },
  {
    path: '/:id',
    component: WorkitemsManageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersFeatureManageUserProfilesRoutingModule {}
