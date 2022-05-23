import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'manage',
    loadChildren: () =>
      import('@app/workitems/feature-manage').then((m) => m.WorkitemsFeatureManageModule),
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
export class WorkitemsShellModule {}
