import { Module } from '@nestjs/common';

import { BaseController } from './base.controller';

@Module({
  imports: [],
  controllers: [BaseController],
  providers: [],
  exports: [],
})
export class BaseModule {}
