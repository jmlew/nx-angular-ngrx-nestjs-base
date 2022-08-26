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
