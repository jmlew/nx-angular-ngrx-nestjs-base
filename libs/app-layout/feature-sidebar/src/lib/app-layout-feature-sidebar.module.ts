import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutUiSidebarModule } from '@app/app-layout/ui-sidebar';

import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';

@NgModule({
  imports: [CommonModule, AppLayoutUiSidebarModule],
  exports: [AppSidebarComponent],
  declarations: [AppSidebarComponent],
})
export class AppLayoutFeatureSidebarModule {}
