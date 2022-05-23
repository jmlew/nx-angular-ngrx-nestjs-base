import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManageComponent } from './manage.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
  },
  {
    path: '/:id',
    component: ManageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersFeatureManageRoutingModule {}
