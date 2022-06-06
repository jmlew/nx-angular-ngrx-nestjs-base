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
  GenericUserProfileResponse,
  UserProfile,
  UserProfileParams,
} from '@app/users/api-model';

enum ErrorMessage {
  NoUserMatch = 'User does not exist in the Mock DB.',
  DuplicateEmail = 'Duplicate email in Mock CRM DB.',
  DuplicatePrimaryId = 'Duplicate primary ID in Mock CRM DB.',
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
  createUserProfile(
    @Body() params: UserProfileParams
  ): Observable<GenericUserProfileResponse> {
    if (this.userService.isFieldDuplicate(params)) {
      throw new BadRequestException(ErrorMessage.DuplicatePrimaryId);
    }
    if (this.userService.isFieldDuplicate(params, 'emailId', params['emailId'])) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.createUser(params));
  }

  @Put(':id')
  updateUserProfile(
    @Param('id') id: string,
    @Body() params: UserProfile
  ): Observable<GenericUserProfileResponse> {
    if (this.userService.isFieldDuplicate(params, 'emailId', params['emailId'])) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.updateUser(id, params));
  }

  @Delete(':id')
  deleteUserProfile(@Param('id') id: string): Observable<GenericUserProfileResponse> {
    // TODO: Investigate why this is being called twice.
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
