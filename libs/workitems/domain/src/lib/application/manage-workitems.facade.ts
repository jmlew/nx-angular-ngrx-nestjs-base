import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiRequestState } from '@app/shared/api-status/util';
import { SseStream } from '@app/shared/util-http';
import { Store, select } from '@ngrx/store';

import * as WorkitemsActions from '../+state/workitems/workitems.actions';
import * as WorkitemsFeature from '../+state/workitems/workitems.reducer';
import * as WorkitemsSelectors from '../+state/workitems/workitems.selectors';
import { Workitem } from '../entities/workitem.model';
import { WorkitemsDataService } from '../infrastructure/workitems.data.service';

/*
   Application facade act as the main contact for a specific usecase (managing workitems)
   with the rest of the domain and refereced in the optional domain api module if
   applicable for cases where this domain needs to be shared with others.

   Abstracts NgRX state management and infrastructure methods which are not hooked into
   NgRX.
*/

@Injectable()
export class ManageWorkitemsFacade {
  workitemsRequestState$: Observable<ApiRequestState> = this.store.pipe(
    select(WorkitemsSelectors.selectWorkitemsRequestState)
  );
  allWorkitems$: Observable<Workitem[]> = this.store.pipe(
    select(WorkitemsSelectors.selectAllWorkitems)
  );
  selectedWorkitem$: Observable<Workitem | undefined> = this.store.pipe(
    select(WorkitemsSelectors.selectSelectedWorkitem)
  );

  constructor(
    private workitemsData: WorkitemsDataService,
    private readonly store: Store<WorkitemsFeature.WorkitemsState>
  ) {}

  getWorkitemsStream(): SseStream<Workitem[]> {
    return this.workitemsData.getWorkitemsStream();
  }

  loadWorkitems() {
    this.store.dispatch(WorkitemsActions.loadWorkitems());
  }

  /* getAllWorkitems(): Observable<Workitem[]> {
    return this.dataService.getAllWorkitems();
  }

  getWorkitemById(id: number): Observable<Workitem> {
    return this.dataService.getWorkitemById(id);
  }

  createWorkitem(user: WorkitemParams): Observable<CreateWorkitemResponse> {
    return this.dataService.createWorkitem(user);
  }

  updateWorkitem(user: Workitem): Observable<UpdateWorkitemResponse> {
    return this.dataService.updateWorkitem(user);
  }

  deleteWorkitem(id: number): Observable<number> {
    return this.dataService.deleteWorkitem(id);
  } */
}
