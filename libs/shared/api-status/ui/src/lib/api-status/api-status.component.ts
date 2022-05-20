import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as fromApiStatus from '@app/shared/api-status/util';

@Component({
  selector: 'app-api-status',
  templateUrl: './api-status.component.html',
  styleUrls: ['./api-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiStatusComponent {
  readonly ApiStatus = fromApiStatus.ApiStatus;

  @Input() requestState: fromApiStatus.ApiRequestState;
}
