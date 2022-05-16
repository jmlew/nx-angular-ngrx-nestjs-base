interface DictionaryStr<T> {
  [id: string]: T | undefined;
}

interface DictionaryNum<T> {
  [id: number]: T | undefined;
}

export interface Entity<T> extends DictionaryStr<T>, DictionaryNum<T> {}

export interface EntitySelectors<T> {
  selectIds: (entities: Entity<T>) => string[] | number[];
  selectAll: (entities: Entity<T>) => T[];
  selectTotal: (entities: Entity<T>) => number;
}

export interface UpdateStr<T> {
  id: string;
  changes: Partial<T>;
}

export interface UpdateNum<T> {
  id: number;
  changes: Partial<T>;
}

export declare type Update<T> = UpdateStr<T> | UpdateNum<T>;

export interface EntityAdapter<T> {
  createEntities(items: T[], selectId: keyof T): Entity<T>;
  addOne(item: T, entities: Entity<T>): Entity<T>;
  addMany(items: T[], entities: Entity<T>): Entity<T>;
  removeOne(id: string | number, entities: Entity<T>): Entity<T>;
  removeMany(ids: (string | number)[], entities: Entity<T>): Entity<T>;
  updateOne(update: Update<T>, entities: Entity<T>): Entity<T>;
  upsertOne(item: T, entities: Entity<T>): Entity<T>;
}

export class EntitiesService<T> implements EntityAdapter<T>, EntitySelectors<T> {
  constructor(private selectId: keyof T) {}

  createEntities(items: T[]): Entity<T> {
    return items.reduce(
      (entities: Entity<T>, item: T) => this.addOne(item, entities),
      {}
    );
  }

  createEntity(item: T): Entity<T> {
    const id: unknown = item[this.selectId];
    return { [id as string]: item };
  }

  addOne(item: T, entities: Entity<T>): Entity<T> {
    const entitiy: Entity<T> = this.createEntity(item);
    return { ...entities, ...entitiy };
  }

  addMany(items: T[], entities: Entity<T>): Entity<T> {
    const added: Entity<T> = this.createEntities(items);
    return { ...entities, ...added };
  }

  removeOne(id: string | number, entities: Entity<T>): Entity<T> {
    const { [id as string]: removed, ...remaining } = entities;
    return remaining;
  }

  removeMany(ids: (string | number)[], entities: Entity<T>): Entity<T> {
    return ids.reduce(
      (entities: Entity<T>, id: string | number) => this.removeOne(id, entities),
      entities
    );
  }

  updateOne(update: Update<T>, entities: Entity<T>): Entity<T> {
    const { id, changes } = update;
    if (entities[id]) {
      const entity: T = entities[id] as T;
      const updated: T = { ...entity, ...changes };
      return { ...entities, [id]: updated };
    }
    return entities;
  }

  upsertOne(item: T, entities: Entity<T>): Entity<T> {
    const id: unknown = item[this.selectId];
    return id ? { ...entities, [id as string]: item } : this.addOne(item, entities);
  }

  selectIds(entities: Entity<T>): string[] | number[] {
    return Object.keys(entities);
  }

  selectAll(entities: Entity<T>): T[] {
    return this.selectIds(entities).map((id: string | number) => entities[id]) as T[];
  }

  selectTotal(entities: Entity<T>): number {
    return this.selectIds(entities).length;
  }
}
