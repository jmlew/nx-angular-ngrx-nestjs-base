import { Module } from '@nestjs/common';

import { DynamicFormController } from './dynamicform.controller';
import { DynamicFormService } from './dynamicform.service';

@Module({
  imports: [],
  controllers: [DynamicFormController],
  providers: [DynamicFormService],
})
export class DynamicFormModule {}
