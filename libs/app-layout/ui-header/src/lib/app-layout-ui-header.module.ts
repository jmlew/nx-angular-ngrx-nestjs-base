import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { AppHeaderLayoutComponent } from './header-layout/header-layout.component';

@NgModule({
  imports: [CommonModule, SharedExternalLibrariesModule],
  exports: [AppHeaderLayoutComponent],
  declarations: [AppHeaderLayoutComponent],
})
export class AppLayoutUiHeaderModule {}
