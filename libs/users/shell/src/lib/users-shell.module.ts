import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'manage',
    loadChildren: () =>
      import('@app/users/feature-manage').then((m) => m.UsersFeatureManageModule),
  },
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersShellModule {}
