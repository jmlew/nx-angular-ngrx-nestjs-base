import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersEditRoleComponent } from './users-edit-role/users-edit-role.component';
import { UsersManageRolesComponent } from './users-manage-roles/users-manage-roles.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManageRolesComponent,
  },
  {
    path: ':id',
    component: UsersEditRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUserRolesRoutingModule {}
