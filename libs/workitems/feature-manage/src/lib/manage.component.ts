import { Observable } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { SseStream } from '@app/shared/util-common';
import { ManageWorkitemsFacade, Workitem } from '@app/workitems/domain';

@Component({
  selector: 'app-workitems-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit, OnDestroy {
  // TODO: convert into BeahviourSubject stream on facade.
  workitems$: Observable<Workitem[]>;
  private workitemsStream: SseStream<Workitem[]>;

  constructor(private manageFacade: ManageWorkitemsFacade) {}

  ngOnInit() {
    this.workitemsStream = this.manageFacade.getAllWorkitemsStream();
    this.workitems$ = this.workitemsStream.data;
  }

  ngOnDestroy() {
    this.workitemsStream.source.close();
  }
}
