import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ManageFacade } from '@example-app/users/domain';

@Component({
  selector: 'users-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageComponent implements OnInit {
  userList$ = this.manageFacade.userList$;

  constructor(private manageFacade: ManageFacade) {}

  ngOnInit() {
    this.load();
  }

  load(): void {
    this.manageFacade.load();
  }
}
