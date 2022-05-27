import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersEditPermissionComponent } from './users-edit-permission/users-edit-permission.component';
import { UsersManagePermissionsComponent } from './users-manage-permissions/users-manage-permissions.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagePermissionsComponent,
  },
  {
    path: ':id',
    component: UsersEditPermissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUserPermissionsRoutingModule {}
