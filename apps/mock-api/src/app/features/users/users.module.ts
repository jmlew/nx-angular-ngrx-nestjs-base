import { Module } from '@nestjs/common';

import { UserProfilesController } from './user-profiles.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UserProfilesController],
  providers: [UsersService],
})
export class UsersModule {}
