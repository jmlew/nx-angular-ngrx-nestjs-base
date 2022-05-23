import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import {
  CreateWorkitemResponse,
  UpdateWorkitemResponse,
} from '../entities/workitem-api.model';
// import { Store, select } from '@ngrx/store';
// import { loadWorkitem } from '../+state/workitem/workitem.actions';
// import * as fromWorkitem from '../+state/workitem/workitem.reducer';
// import * as WorkitemSelectors from '../+state/workitem/workitem.selectors';
import { Workitem, WorkitemParams } from '../entities/workitem.model';
import { WorkitemDataService } from '../infrastructure/workitem.data.service';

@Injectable({ providedIn: 'root' })
export class ManageWorkitemsFacade {
  constructor(private dataService: WorkitemDataService) {}

  getAllWorkitemsStream(): Observable<Workitem[]> {
    return this.dataService.getAllWorkitemsStream();
  }

  getAllWorkitems(): Observable<Workitem[]> {
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
  }

  /* loaded$ = this.store.pipe(select(WorkitemSelectors.getWorkitemLoaded));
  workitemList$ = this.store.pipe(select(WorkitemSelectors.getAllWorkitem));
  selectedWorkitem$ = this.store.pipe(select(WorkitemSelectors.getSelected));

  constructor(private store: Store<fromWorkitem.WorkitemPartialState>) {}

  load(): void {
    this.store.dispatch(loadWorkitem());
  } */
}
