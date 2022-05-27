import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilHttpModule } from '@app/shared/util-http';

@NgModule({
  imports: [CommonModule, SharedUtilHttpModule],
  providers: [],
})
export class SharedNavigationDomainModule {}
