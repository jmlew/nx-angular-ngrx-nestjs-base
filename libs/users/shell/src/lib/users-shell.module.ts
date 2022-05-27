import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profiles',
    loadChildren: () =>
      import('@app/users/feature/manage-user-profiles').then(
        (m) => m.UsersFeatureManageUserProfilesModule
      ),
  },
  {
    path: 'roles',
    loadChildren: () =>
      import('@app/users/feature/manage-user-roles').then(
        (module) => module.UsersFeatureManageUserRolesModule
      ),
  },
  {
    path: 'permissions',
    loadChildren: () =>
      import('@app/users/feature/manage-user-permissions').then(
        (module) => module.UsersFeatureManageUserPermissionsModule
      ),
  },
  {
    path: '',
    redirectTo: 'profiles',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersShellModule {}
