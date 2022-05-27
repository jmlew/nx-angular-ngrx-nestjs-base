import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconMat } from '@app/shared/ui-common';
import { Workitem } from '@app/workitems/domain';

@Component({
  selector: 'app-workitems-list',
  templateUrl: './workitems-list.component.html',
  styleUrls: ['./workitems-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkitemsListComponent {
  IconMat = IconMat;

  @Input() workitems: Workitem[];
}
