import { Module } from '@nestjs/common';

import { BaseModule } from './features/base/base.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [BaseModule, UsersModule],
})
export class AppModule {}
