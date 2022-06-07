import { UserProfile, WriteUserProfileResponse } from '@app/users/api-model';
import { Injectable } from '@nestjs/common';

import * as usersDb from '../../../assets/db/user-profiles.json';
import { EntitiesApiBaseService } from '../../shared/services';

@Injectable()
export class UsersService extends EntitiesApiBaseService<UserProfile, string> {
  constructor() {
    const primaryKey = 'userId';
    super(primaryKey);
    this.initDb();
  }

  initDb() {
    const db = { ...usersDb }.data as UserProfile[];
    this.createEntities(db);
  }

  getAllUsers(): UserProfile[] {
    return this.selectAll();
  }

  getUserById(id: string): UserProfile {
    return this.selectOne(id);
  }

  createUser(user: UserProfile): WriteUserProfileResponse {
    this.addEntity(user);
    const { userId } = user;
    return { userId, status: 'active' };
  }

  updateUser(id: string, user: UserProfile): WriteUserProfileResponse {
    this.updateEntity(id, user);
    return { userId: id, status: 'active' };
  }

  deleteUser(id: string): WriteUserProfileResponse {
    this.removeEntity(id);
    return { userId: id, status: 'removed' };
  }

  deleteUsers(ids: string[]): string[] {
    this.removeEntities(ids);
    return ids;
  }

  doesUserExist(id: string): boolean {
    return this.doesEntityExist(id);
  }

  isFieldDuplicate(
    user: UserProfile,
    field: string = this.primaryKey,
    ignoreValue: any = null
  ): boolean {
    const users: UserProfile[] = this.selectAll();
    return users
      .filter((item: UserProfile) => ignoreValue === null || item[field] !== ignoreValue)
      .some((item: UserProfile) => item[field] === user[field]);
  }

  private timestamp(): string {
    // TODO: Add common utils lib with date utils from 'luxon' library.
    return 'timestamp-date-string';
  }
}
