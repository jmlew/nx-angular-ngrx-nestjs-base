import { Module } from '@nestjs/common';

import { WorkitemsController } from './workitems.controller';
import { WorkitemsService } from './workitems.service';

@Module({
  imports: [],
  controllers: [WorkitemsController],
  providers: [WorkitemsService],
})
export class WorkitemsModule {}
