import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [CommonModule, SharedExternalLibrariesModule],
  exports: [SidenavComponent],
  declarations: [SidenavComponent],
})
export class AppLayoutUiSidebarModule {}
