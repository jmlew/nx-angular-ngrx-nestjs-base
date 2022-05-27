import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseSseDataService } from './http/base-sse.data.service';
import { BaseDataService } from './http/base.data.service';

@NgModule({
  imports: [CommonModule],
  providers: [BaseDataService, BaseSseDataService],
})
export class SharedUtilHttpModule {}
