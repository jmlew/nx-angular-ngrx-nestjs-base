import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'users',
    data: { sample: 'foo' },
    loadChildren: () => import('@app/users/shell').then((m) => m.UsersShellModule),
  },
  {
    path: 'workitems',
    data: { sample: 'bar' },
    loadChildren: () =>
      import('@app/workitems/shell').then((m) => m.WorkitemsShellModule),
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
