import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutUiSidebarModule } from '@app/app-layout/ui-sidebar';
import { SharedNavigationDomainModule } from '@app/shared/navigation/domain';

import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';

const sharedModules = [SharedNavigationDomainModule];
const domainModules = [AppLayoutUiSidebarModule];

@NgModule({
  imports: [CommonModule, ...sharedModules, ...domainModules],
  exports: [AppSidebarComponent],
  declarations: [AppSidebarComponent],
})
export class AppLayoutFeatureSidebarModule {}
