import { NgModule } from '@angular/core';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

@NgModule({
  imports: [SharedExternalLibrariesModule],
  exports: [SharedExternalLibrariesModule],
  declarations: [],
})
export class SharedUiCommonModule {}
