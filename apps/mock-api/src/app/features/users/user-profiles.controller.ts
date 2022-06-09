import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { toStreamWithDelay } from '../../shared/utils';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import {
  WriteUserProfileResponse,
  UserProfile,
  UserProfileParams,
} from '@app/users/api-model';

enum ErrorMessage {
  TestBadRequest = 'Sample response to simulate an invalid request.',
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

  // Failed version, uncomment the method decorator above to enable and test this version.
  @Get()
  @HttpCode(400)
  getUserProfilesFailed(): Observable<HttpException> {
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  @Get(':id')
  getUserProfile(@Param('id') id: string): Observable<UserProfile> {
    if (!this.userService.doesUserExist(id)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.getUserById(id));
  }

  // Failed version, uncomment the method decorator above to enable and test this version.
  @Get(':id')
  @HttpCode(400)
  getUserProfileFailed(@Param('id') id: string): Observable<HttpException> {
    // throw new BadRequestException(ErrorMessage.TestBadRequest);
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  // @Post()
  createUserProfile(
    @Body() params: UserProfileParams
  ): Observable<WriteUserProfileResponse> {
    if (this.userService.isFieldDuplicate(params)) {
      throw new BadRequestException(ErrorMessage.DuplicatePrimaryId);
    }
    if (this.userService.isFieldDuplicate(params, 'emailId', params['emailId'])) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.createUser(params));
  }

  // Failed version, uncomment the method decorator above to enable and test this version.
  @Post()
  @HttpCode(400)
  createUserProfileFailed(@Body() params: UserProfileParams): Observable<HttpException> {
    // throw new BadRequestException(ErrorMessage.TestBadRequest);
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  // @Put(':id')
  updateUserProfile(
    @Param('id') id: string,
    @Body() params: UserProfile
  ): Observable<WriteUserProfileResponse> {
    if (this.userService.isFieldDuplicate(params, 'emailId', params['emailId'])) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.updateUser(id, params), 1000);
  }

  @Put(':id')
  @HttpCode(400)
  updateUserProfileFaile(
    @Param('id') id: string,
    @Body() params: UserProfile
  ): Observable<HttpException> {
    // throw new BadRequestException(ErrorMessage.TestBadRequest);
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  // @Delete(':id')
  deleteUserProfile(@Param('id') id: string): Observable<WriteUserProfileResponse> {
    if (!this.userService.doesUserExist(id)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.deleteUser(id));
  }

  @Delete(':id')
  @HttpCode(400)
  deleteUserProfileFailed(@Param('id') id: string): Observable<HttpException> {
    // throw new BadRequestException(ErrorMessage.TestBadRequest);
    return this.toStream(new BadRequestException(ErrorMessage.TestBadRequest), 1000);
  }

  private toStream<T>(data: T, delay = 500) {
    return toStreamWithDelay(data, delay);
  }
}
