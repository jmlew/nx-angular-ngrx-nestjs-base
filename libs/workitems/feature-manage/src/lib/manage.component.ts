import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { ManageWorkitemsFacade, Workitem } from '@app/workitems/domain';

@Component({
  selector: 'app-workitems-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  // TODO: convert into BeahviourSubject stream on facade.
  workitems$: Observable<Workitem[]>;
  constructor(private manageFacade: ManageWorkitemsFacade) {}

  ngOnInit() {
    this.workitems$ = this.manageFacade.getAllWorkitemsStream();
  }
}
