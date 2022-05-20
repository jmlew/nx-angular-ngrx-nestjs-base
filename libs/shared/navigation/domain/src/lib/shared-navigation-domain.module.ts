import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilCommonModule } from '@app/shared/util-common';

@NgModule({
  imports: [CommonModule, SharedUtilCommonModule],
  providers: [],
})
export class SharedNavigationDomainModule {}
