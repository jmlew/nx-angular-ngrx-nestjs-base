import { Observable } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
import { SseStream } from '@app/shared/util-common';
import { ManageWorkitemsFacade, Workitem } from '@app/workitems/domain';

@Component({
  selector: 'app-workitems-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit, OnDestroy {
  readonly ApiStatus = ApiStatus;
  readonly allWorkitems$: Observable<Workitem[]> = this.manageFacade.allWorkitems$;
  readonly workitemsRequestState$: Observable<ApiRequestState> =
    this.manageFacade.workitemsRequestState$;

  workitemsStreamData$: Observable<Workitem[]>;
  private workitemsStream: SseStream<Workitem[]>;

  constructor(private manageFacade: ManageWorkitemsFacade) {}

  ngOnInit() {
    // As a collection in reponse to an HHTP call using NgRX.
    this.manageFacade.loadWorkitems();

    // As a SSE stream.
    this.workitemsStream = this.manageFacade.getWorkitemsStream();
    this.workitemsStreamData$ = this.workitemsStream.data;
  }

  ngOnDestroy() {
    this.workitemsStream.source.close();
  }
}
