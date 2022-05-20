import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AppLayoutFeatureHeaderModule } from '@app/app-layout/feature-header';
import { AppLayoutFeatureSidebarModule } from '@app/app-layout/feature-sidebar';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { AppRoutingModule } from './app-routing.module';
import { AppShellComponent } from './app-shell/app-shell.component';

const shellModules = [AppLayoutFeatureHeaderModule, AppLayoutFeatureSidebarModule];
const sharedModules = [SharedExternalLibrariesModule];

@NgModule({
  imports: [CommonModule, ...sharedModules, ...shellModules, AppRoutingModule],
  exports: [AppShellComponent],
  declarations: [AppShellComponent],
})
export class AppLayoutShellModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AppLayoutShellModule
  ) {
    if (parentModule) {
      throw new Error(
        'AppLayoutShellModule module is already imported. Import into AppModule only.'
      );
    }
  }
}
