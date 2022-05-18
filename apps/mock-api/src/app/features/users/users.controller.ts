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

import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserParams,
} from '@app/users/api-model';

import { toStreamWithDelay } from '../../shared/utils';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

enum ErrorMessage {
  NoUserMatch = 'User does not exist in the Mock DB.',
  DuplicateEmail = 'Duplicate email in Mock CRM DB.',
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('reset')
  getResetDb(): string {
    this.userService.initData();
    return 'Mock API Users DB has been reset.';
  }

  @Get()
  getUsers(): Observable<GetUsersResponse> {
    return this.toStream(this.userService.getAllUsers(), 1000);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Observable<GetUserResponse> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesUserExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.getUserById(userId));
  }

  @Post()
  createUser(@Body() params: UserParams): Observable<CreateUserResponse> {
    if (this.userService.isUserDuplicate(params)) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.createUser(params));
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() params: User
  ): Observable<UpdateUserResponse> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesUserExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    if (this.userService.isUserDuplicate(params, userId)) {
      throw new BadRequestException(ErrorMessage.DuplicateEmail);
    }
    return this.toStream(this.userService.updateUser(userId, params));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Observable<number> {
    const userId: number = parseInt(id, 10);
    if (!this.userService.doesUserExist(userId)) {
      throw new BadRequestException(ErrorMessage.NoUserMatch);
    }
    return this.toStream(this.userService.deleteUser(userId));
  }

  @Delete()
  deleteUsers(@Body() ids: string[]): Observable<number[]> {
    const userIds: number[] = ids.map((id: string) => parseInt(id, 10));
    return this.toStream(this.userService.deleteUsers(userIds));
  }

  private toStream<T>(data: T, delay = 500) {
    return toStreamWithDelay(data, delay);
  }
}
