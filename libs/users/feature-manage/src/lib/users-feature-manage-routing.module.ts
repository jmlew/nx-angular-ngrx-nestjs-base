import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersManageComponent } from './users-manage/users-manage.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersFeatureManageRoutingModule {}
