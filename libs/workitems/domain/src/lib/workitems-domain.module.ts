import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedUtilCommonModule } from '@app/shared/util-common';

import { ManageWorkitemsFacade } from './application/manage-workitems.facade';
import { WorkitemDataService } from './infrastructure/workitem.data.service';

// import { WorkitemEffects } from './+state/workitem/workitem.effects';
// import * as fromWorkitem from './+state/workitem/workitem.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    SharedUtilCommonModule,
    // StoreModule.forFeature(fromWorkitem.WORKITEM_FEATURE_KEY, fromWorkitem.reducer),
    // EffectsModule.forFeature([WorkitemEffects]),
  ],
  providers: [ManageWorkitemsFacade, WorkitemDataService],
})
export class WorkitemsDomainModule {}
