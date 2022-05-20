interface DictionaryStr<T> {
  [id: string]: T | undefined;
}

interface DictionaryNum<T> {
  [id: number]: T | undefined;
}

export interface Entity<T> extends DictionaryStr<T>, DictionaryNum<T> {}

export interface EntitySelectors<T, K> {
  selectIds: (entities: Entity<T>) => K[];
  selectAll: (entities: Entity<T>) => T[];
  selectTotal: (entities: Entity<T>) => number;
}

export interface UpdateEntityStr<T> {
  id: string;
  changes: Partial<T>;
}

export interface UpdateEntityNum<T> {
  id: number;
  changes: Partial<T>;
}

export declare type UpdateEntity<T> = UpdateEntityStr<T> | UpdateEntityNum<T>;

export interface EntityAdapter<T, K> {
  createEntities(items: T[], selectId: keyof T): Entity<T>;
  addOne(item: T, entities: Entity<T>): Entity<T>;
  addMany(items: T[], entities: Entity<T>): Entity<T>;
  removeOne(id: K, entities: Entity<T>): Entity<T>;
  removeMany(ids: K[], entities: Entity<T>): Entity<T>;
  updateOne(update: UpdateEntity<T>, entities: Entity<T>): Entity<T>;
  upsertOne(item: T, entities: Entity<T>): Entity<T>;
}
