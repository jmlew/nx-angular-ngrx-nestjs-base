import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { WorkitemsListComponent } from './workitems-list/workitems-list.component';

const sharedModules = [SharedExternalLibrariesModule];

@NgModule({
  imports: [CommonModule, ...sharedModules],
  declarations: [WorkitemsListComponent],
  exports: [WorkitemsListComponent],
})
export class WorkitemsUiManageModule {}
