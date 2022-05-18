import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUiCommonModule } from '@app/shared/ui-common';

import { ApiStatusComponent } from './api-status/api-status.component';

@NgModule({
  imports: [CommonModule, SharedUiCommonModule],
  declarations: [ApiStatusComponent],
  exports: [ApiStatusComponent],
})
export class SharedApiStatusUiModule {}
