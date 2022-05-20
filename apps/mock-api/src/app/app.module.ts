import { Module } from '@nestjs/common';

import { BaseModule } from './features/base/base.module';
import { DynamicFormModule } from './features/dynamicform/dynamicform.module';
import { NavigationModule } from './features/navigation/navigation.module';
import { UsersModule } from './features/users/users.module';

@Module({
  imports: [BaseModule, UsersModule, NavigationModule, DynamicFormModule],
})
export class AppModule {}
