import { Injectable } from '@nestjs/common';

import * as navigationDb from '../../../assets/db/navigation.json';

@Injectable()
export class NavigationService {
  private features: string[];

  constructor() {
    this.initDb();
  }

  initDb() {
    this.features = navigationDb.features as string[];
  }

  getFeatureNames(): string[] {
    return this.features;
  }
}
