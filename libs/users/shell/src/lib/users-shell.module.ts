import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteDomainPath } from '@app/users/domain';

import { UsersShellComponent } from './users-shell/users-shell.component';

const routes: Routes = [
  {
    path: '',
    component: UsersShellComponent,
    children: [
      {
        path: RouteDomainPath.Profiles,
        loadChildren: () =>
          import('@app/users/feature/manage-user-profiles').then(
            (module) => module.UsersFeatureManageUserProfilesModule
          ),
      },
      {
        path: RouteDomainPath.Roles,
        loadChildren: () =>
          import('@app/users/feature/manage-user-roles').then(
            (module) => module.UsersFeatureManageUserRolesModule
          ),
      },
      {
        path: RouteDomainPath.Permissions,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  declarations: [UsersShellComponent],
  exports: [],
})
export class UsersShellModule {}

/* const routes: Routes = [
  {
    path: '',
    component: UsersShellComponent,
    children: [
      {
        path: 'profiles',
        loadChildren: () =>
          import('@app/users/feature/manage-user-profiles').then(
            (module) => module.UsersFeatureManageUserProfilesModule
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
    ],
  },
]; */
