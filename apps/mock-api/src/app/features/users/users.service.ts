import {
  CreateUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserParams,
} from '@app/users/api-model';
import { Injectable } from '@nestjs/common';

import * as usersDb from '../../../assets/db/users.json';
import { EntitiesApiBaseService } from '../../shared/services';

@Injectable()
export class UsersService extends EntitiesApiBaseService<User, number> {
  constructor() {
    const primaryId: keyof User = 'id';
    super(primaryId);
    this.initDb();
  }

  initDb() {
    const db = { ...usersDb }.data as User[];
    this.createEntities(db);
  }

  getAllUsers(): GetUsersResponse {
    const users: User[] = this.selectAll();
    const response: GetUsersResponse = { data: users };
    return response;
  }

  getUserById(id: number): GetUserResponse {
    const user: User = this.selectOne(id);
    const response: GetUserResponse = { data: user };
    return response;
  }

  createUser(params: UserParams): CreateUserResponse {
    const user: CreateUserResponse = this.normaliseNewUser(params);
    this.addEntity(user);
    return user;
  }

  updateUser(id: number, params: UserParams): UpdateUserResponse {
    this.updateEntity(id, this.normaliseEditedUser(params));
    return this.selectOne(id) as UpdateUserResponse;
  }

  deleteUser(id: number): number {
    this.removeEntity(id);
    return id;
  }

  deleteUsers(ids: number[]): number[] {
    this.removeEntities(ids);
    return ids;
  }

  doesUserExist(id: number): boolean {
    return this.doesEntityExist(id);
  }

  isUserDuplicate(user: UserParams, ignoreUserId: number = null): boolean {
    const users: User[] = this.selectAll();
    return users
      .filter((item: User) => ignoreUserId === null || item.id !== ignoreUserId)
      .some((item: User) => item.email === user.email);
  }

  private normaliseNewUser(params: UserParams): CreateUserResponse {
    const ids: number[] = this.selectIds() as number[];
    const id: number = Math.max(...ids) + 1;
    return { ...params, id, createdAt: this.timestamp() };
  }

  private normaliseEditedUser(user: Partial<User>) {
    return { ...user, updatedAt: this.timestamp() };
  }

  private timestamp(): string {
    // TODO: Add common utils lib with date utils from 'luxon' library.
    return 'timestamp-date-string';
  }
}
