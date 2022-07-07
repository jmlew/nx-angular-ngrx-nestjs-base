import { GetFormConfigsResponse } from '@app/shared/dynamicform/api-model';
import { Injectable } from '@nestjs/common';

import * as dynamicFormDb from '../../../assets/db/dynamicform.json';

type DynamicFormDb = GetFormConfigsResponse;

@Injectable()
export class DynamicFormService {
  private db: DynamicFormDb;

  constructor() {
    this.initDb();
  }

  initDb() {
    this.db = { ...dynamicFormDb }.data as DynamicFormDb;
  }

  getConfigsResponse(): GetFormConfigsResponse {
    return this.db;
  }
}
