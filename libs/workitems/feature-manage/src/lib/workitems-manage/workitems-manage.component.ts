import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
import { SseStream } from '@app/shared/util-http';
import { ManageWorkitemsFacade, Workitem } from '@app/workitems/domain';

@Component({
  selector: 'app-workitems-manage',
  templateUrl: './workitems-manage.component.html',
  styleUrls: ['./workitems-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkitemsManageComponent implements OnInit, OnDestroy {
  readonly ApiStatus = ApiStatus;
  readonly allWorkitems$: Observable<Workitem[]> = this.manageFacade.allWorkitems$;
  readonly workitemsRequestState$: Observable<ApiRequestState> =
    this.manageFacade.workitemsRequestState$;

  private workitemsStream: SseStream<Workitem[]>;
  workitemsStreamData$: Observable<Workitem[]>;

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
