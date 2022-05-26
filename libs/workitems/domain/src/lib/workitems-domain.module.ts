import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilCommonModule } from '@app/shared/util-common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';

import { WorkitemsEffects } from './+state/workitems/workitems.effects';
import * as fromWorkitems from './+state/workitems/workitems.reducer';
import { ManageWorkitemsFacade } from './application/manage-workitems.facade';
import { WorkitemDataService } from './infrastructure/workitem.data.service';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilCommonModule,
    StoreModule.forFeature(fromWorkitems.WORKITEMS_FEATURE_KEY, fromWorkitems.reducer),
    EffectsModule.forFeature([WorkitemsEffects]),
  ],
  providers: [ManageWorkitemsFacade, WorkitemDataService, DataPersistence],
})
export class WorkitemsDomainModule {}
