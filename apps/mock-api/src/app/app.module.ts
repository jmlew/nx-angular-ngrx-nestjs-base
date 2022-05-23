import { Module } from '@nestjs/common';

import { BaseModule } from './features/base/base.module';
import { DynamicFormModule } from './features/dynamicform/dynamicform.module';
import { NavigationModule } from './features/navigation/navigation.module';
import { UsersModule } from './features/users/users.module';
import { WorkitemsModule } from './features/workitems/workitems.module';

@Module({
  imports: [
    BaseModule,
    UsersModule,
    NavigationModule,
    DynamicFormModule,
    WorkitemsModule,
  ],
})
export class AppModule {}
