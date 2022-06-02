import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import {
  UpdateUserProfileResponse,
  UserProfile,
  UserProfileParams,
} from '@app/users/api-model';

enum ErrorMessage {
  NoUserMatch = 'User does not exist in the Mock DB.',
  DuplicateEmail = 'Duplicate email in Mock CRM DB.',
}

@Controller('admin/user_profile')
export class UserProfilesController {
  constructor(private readonly userService: UsersService) {}

  @Get('reset')
  getResetDb(): string {
    this.userService.initDb();
    return 'Mock API Users DB has been reset.';
  }

  @Get()
  getUserProfiles(): Observable<UserProfile[]> {
    return this.toStream(this.userService.getAllUsers(), 1000);
  }

  @Get(':id')
  getUserProfile(@Param('id') id: string): Observable<UserProfile> {
    if (!this.userService.doesUserExist(id)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.getUserById(id));
  }

  @Post()
  createUser(@Body() params: UserProfileParams): Observable<UpdateUserProfileResponse> {
    if (this.userService.isUserDuplicate(params)) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.createUser(params));
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() params: UserProfile
  ): Observable<UpdateUserProfileResponse> {
    if (!this.userService.doesUserExist(id)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    if (this.userService.isUserDuplicate(params, id)) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.updateUser(id, params));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<string> {
    console.log('deleteUser', id);
    if (!this.userService.doesUserExist(id)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.deleteUser(id));
  }

  private toStream<T>(data: T, delay = 500) {
    return toStreamWithDelay(data, delay);
  }
}
