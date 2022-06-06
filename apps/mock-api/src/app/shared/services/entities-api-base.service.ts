import { Injectable } from '@nestjs/common';

import { Entity } from '../models/entity.model';
import { EntitiesService } from '.';

@Injectable()
export class EntitiesApiBaseService<T, K extends string | number> {
  entityService: EntitiesService<T, K>;
  entities: Entity<T>;
  protected primaryKey: string;

  constructor(primaryKey: string) {
    this.primaryKey = primaryKey;
    this.entityService = new EntitiesService<T, K>(primaryKey);
  }

  protected createEntities(db: T[]) {
    this.entities = this.entityService.createEntities(db);
  }

  protected doesEntityExist(id: K): boolean {
    return this.entities[id] !== undefined;
  }

  protected updateEntity(id: K, changes: Partial<T>) {
    this.entities = this.entityService.updateOne({ id, changes }, this.entities);
  }

  protected addEntity(user: T) {
    this.entities = this.entityService.addOne(user, this.entities);
  }

  protected removeEntity(id: K) {
    this.entities = this.entityService.removeOne(id, this.entities);
  }

  protected removeEntities(ids: K[]) {
    this.entities = this.entityService.removeMany(ids, this.entities);
  }

  protected selectOne(id: K): T {
    return this.entities[id];
  }

  protected selectAll(): T[] {
    return this.entityService.selectAll(this.entities);
  }

  protected selectIds(): K[] {
    return this.entityService.selectIds(this.entities);
  }
}
