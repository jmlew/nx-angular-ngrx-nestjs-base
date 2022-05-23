import {
  CreateWorkitemResponse,
  GetWorkitemResponse,
  GetWorkitemsResponse,
  UpdateWorkitemResponse,
  Workitem,
} from '@app/workitems/api-model';
import { WorkitemParams } from '@app/workitems/domain';
import { Injectable } from '@nestjs/common';

import * as workitemsDb from '../../../assets/db/workitems.json';
import { EntitiesApiBaseService } from '../../shared/services';

@Injectable()
export class WorkitemsService extends EntitiesApiBaseService<Workitem, number> {
  constructor() {
    const primaryId: keyof Workitem = 'id';
    super(primaryId);
    this.initDb();
  }

  initDb() {
    const db = { ...workitemsDb }.data as Workitem[];
    this.createEntities(db);
  }

  getAllWorkitems(): GetWorkitemsResponse {
    const workitems: Workitem[] = this.selectAll();
    const response: GetWorkitemsResponse = { data: workitems };
    return response;
  }

  getAllWorkitemIds(): number[] {
    return this.selectIds();
  }

  getRandomWorkitemId(): number {
    const ids: number[] = this.selectIds();
    return ids[Math.floor(Math.random() * ids.length)];
  }

  getWorkitemById(id: number): GetWorkitemResponse {
    const user: Workitem = this.selectOne(id);
    const response: GetWorkitemResponse = { data: user };
    return response;
  }

  createWorkitem(params: WorkitemParams): CreateWorkitemResponse {
    const user: CreateWorkitemResponse = this.normaliseNewWorkitem(params);
    this.addEntity(user);
    return user;
  }

  updateWorkitem(id: number, params: WorkitemParams): UpdateWorkitemResponse {
    this.updateEntity(id, this.normaliseEditedWorkitem(params));
    return this.selectOne(id) as UpdateWorkitemResponse;
  }

  deleteWorkitem(id: number): number {
    this.removeEntity(id);
    return id;
  }

  deleteWorkitems(ids: number[]): number[] {
    this.removeEntities(ids);
    return ids;
  }

  doesWorkitemExist(id: number): boolean {
    return this.doesEntityExist(id);
  }

  isWorkitemDuplicate(user: WorkitemParams, ignoreWorkitemId: number = null): boolean {
    const workitems: Workitem[] = this.selectAll();
    return workitems
      .filter(
        (item: Workitem) => ignoreWorkitemId === null || item.id !== ignoreWorkitemId
      )
      .some((item: Workitem) => item.name === user.name);
  }

  private normaliseNewWorkitem(params: WorkitemParams): CreateWorkitemResponse {
    const ids: number[] = this.selectIds() as number[];
    const id: number = Math.max(...ids) + 1;
    return { ...params, id, createdAt: this.timestamp() };
  }

  private normaliseEditedWorkitem(user: Partial<Workitem>) {
    return { ...user, updatedAt: this.timestamp() };
  }

  private timestamp(): string {
    // TODO: Add common utils lib with date utils from 'luxon' library.
    return 'timestamp-date-string';
  }
}
