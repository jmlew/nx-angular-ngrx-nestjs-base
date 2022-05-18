import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseDataService } from './http/base.data.service';

@NgModule({
  imports: [CommonModule],
  providers: [BaseDataService],
})
export class SharedUtilCommonModule {}
