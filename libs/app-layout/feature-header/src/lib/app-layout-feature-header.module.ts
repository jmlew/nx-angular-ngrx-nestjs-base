import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutUiHeaderModule } from '@app/app-layout/ui-header';

import { AppHeaderComponent } from './app-header/app-header.component';

@NgModule({
  imports: [CommonModule, AppLayoutUiHeaderModule],
  exports: [AppHeaderComponent],
  declarations: [AppHeaderComponent],
})
export class AppLayoutFeatureHeaderModule {}
