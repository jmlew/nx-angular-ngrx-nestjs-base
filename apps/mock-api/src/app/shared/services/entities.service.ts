import {
  Entity,
  EntityAdapter,
  EntitySelectors,
  UpdateEntity,
} from '../models/entity.model';

export class EntitiesService<T, K extends string | number>
  implements EntityAdapter<T, K>, EntitySelectors<T, K>
{
  constructor(private selectIdKey: string) {}

  createEntities(items: T[]): Entity<T> {
    return items.reduce(
      (entities: Entity<T>, item: T) => this.addOne(item, entities),
      {}
    );
  }

  createEntity(item: T): Entity<T> {
    const id: K = item[this.selectIdKey as string];
    return { [id]: item };
  }

  addOne(item: T, entities: Entity<T>): Entity<T> {
    const entitiy: Entity<T> = this.createEntity(item);
    return { ...entities, ...entitiy };
  }

  addMany(items: T[], entities: Entity<T>): Entity<T> {
    const added: Entity<T> = this.createEntities(items);
    return { ...entities, ...added };
  }

  removeOne(id: K, entities: Entity<T>): Entity<T> {
    const { [id as K]: removed, ...remaining } = entities;
    return remaining;
  }

  removeMany(ids: K[], entities: Entity<T>): Entity<T> {
    return ids.reduce(
      (entities: Entity<T>, id: K) => this.removeOne(id, entities),
      entities
    );
  }

  updateOne(update: UpdateEntity<T, K>, entities: Entity<T>): Entity<T> {
    const { id, changes } = update;
    if (entities[id]) {
      const entity: T = entities[id] as T;
      const updated: T = { ...entity, ...changes };
      return { ...entities, [id]: updated };
    }
    return entities;
  }

  upsertOne(item: T, entities: Entity<T>): Entity<T> {
    const id: unknown = item[this.selectIdKey as string];
    return id ? { ...entities, [id as K]: item } : this.addOne(item, entities);
  }

  selectIds(entities: Entity<T>): K[] {
    return Object.keys(entities) as K[];
  }

  selectAll(entities: Entity<T>): T[] {
    return this.selectIds(entities).map((id: K) => entities[id]) as T[];
  }

  selectTotal(entities: Entity<T>): number {
    return this.selectIds(entities).length;
  }
}
