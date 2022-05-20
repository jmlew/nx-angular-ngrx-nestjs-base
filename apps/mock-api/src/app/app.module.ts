import { Module } from '@nestjs/common';

import { BaseModule } from './features/base/base.module';
import { NavigationModule } from './features/navigation/navigation.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [BaseModule, UsersModule, NavigationModule],
})
export class AppModule {}
