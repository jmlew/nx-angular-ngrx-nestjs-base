import { EditUserProfileResponse, UserProfile } from '@app/users/api-model';
import { Injectable } from '@nestjs/common';

import * as usersDb from '../../../assets/db/user-profiles.json';
import { EntitiesApiBaseService } from '../../shared/services';

@Injectable()
export class UsersService extends EntitiesApiBaseService<UserProfile, string> {
  constructor() {
    const primaryId: keyof UserProfile = 'emailId';
    super(primaryId);
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

  createUser(user: UserProfile): EditUserProfileResponse {
    this.addEntity(user);
    return this.getNewUserResponse(user);
  }

  updateUser(id: string, user: UserProfile): EditUserProfileResponse {
    this.updateEntity(id, user);
    return this.getEditedUserResponse(user);
  }

  deleteUser(id: string): string {
    this.removeEntity(id);
    return id;
  }

  deleteUsers(ids: string[]): string[] {
    this.removeEntities(ids);
    return ids;
  }

  doesUserExist(id: string): boolean {
    return this.doesEntityExist(id);
  }

  isUserDuplicate(user: UserProfile, ignoreUserId: string = null): boolean {
    const users: UserProfile[] = this.selectAll();
    return users
      .filter(
        (item: UserProfile) => ignoreUserId === null || item.emailId !== ignoreUserId
      )
      .some((item: UserProfile) => item.emailId === user.emailId);
  }

  private getNewUserResponse(user: UserProfile): EditUserProfileResponse {
    // const ids: number[] = this.selectIds() as number[];
    // const id: number = Math.max(...ids) + 1;
    // return { ...user, createdAt: this.timestamp() };
    const { userId } = user;
    return { userId, status: 'active' };
  }

  private getEditedUserResponse(user: Partial<UserProfile>) {
    const { userId } = user;
    return { userId, status: 'active' };
  }

  private timestamp(): string {
    // TODO: Add common utils lib with date utils from 'luxon' library.
    return 'timestamp-date-string';
  }
}
