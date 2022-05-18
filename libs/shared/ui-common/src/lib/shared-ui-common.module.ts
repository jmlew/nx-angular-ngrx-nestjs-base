import { NgModule } from '@angular/core';
import { SharedUiExternalLibrariesModule } from '@app/shared-ui-external-libraries';

@NgModule({
  imports: [SharedUiExternalLibrariesModule],
  exports: [SharedUiExternalLibrariesModule],
  declarations: [],
})
export class SharedUiCommonModule {}
