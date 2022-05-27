import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilHttpModule } from '@app/shared/util-http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';

import { WorkitemsEffects } from './+state/workitems/workitems.effects';
import * as fromWorkitems from './+state/workitems/workitems.reducer';
import { ManageWorkitemsFacade } from './application/manage-workitems.facade';
import { WorkitemsDataService } from './infrastructure/workitems.data.service';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilHttpModule,
    StoreModule.forFeature(fromWorkitems.WORKITEMS_FEATURE_KEY, fromWorkitems.reducer),
    EffectsModule.forFeature([WorkitemsEffects]),
  ],
  providers: [ManageWorkitemsFacade, WorkitemsDataService, DataPersistence],
})
export class WorkitemsDomainModule {}
