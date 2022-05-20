import { FormConfig } from '@app/shared/dynamicform/api-model';
import { Injectable } from '@nestjs/common';

import * as dynamicFormDb from '../../../assets/db/dynamicform.json';

interface DynamicFormDb {
  configs: FormConfig[];
}

@Injectable()
export class DynamicFormService {
  private db: DynamicFormDb;

  constructor() {
    this.initDb();
  }

  initDb() {
    this.db = { ...dynamicFormDb };
  }

  getConfigs(): FormConfig[] {
    return this.db.configs;
  }
}