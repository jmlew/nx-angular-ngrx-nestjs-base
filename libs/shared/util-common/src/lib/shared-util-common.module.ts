import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BaseDataService } from './http/base.data.service';
import { HttpSseDataService } from './http/http-sse.data.service';

@NgModule({
  imports: [CommonModule],
  providers: [BaseDataService, HttpSseDataService],
})
export class SharedUtilCommonModule {}
