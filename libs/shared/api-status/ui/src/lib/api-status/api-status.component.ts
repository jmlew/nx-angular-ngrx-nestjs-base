import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import * as fromApiStatus from '@app/shared/api-status/util';

/*
  Template for displaying content based on API status.
  Consumer can provide a template for content to display conditionally for each status or
  just add content to be rendered via the ng-content directive if the default failed and
  pending content can be displayed.

  <ng-template #success>success content here</ng-template
  <ng-template #failed>failed content here</ng-template
  <ng-template #pending>pending content here</ng-template
*/

@Component({
  selector: 'app-api-status',
  templateUrl: './api-status.component.html',
  styleUrls: ['./api-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiStatusComponent {
  readonly ApiStatus = fromApiStatus.ApiStatus;
  @ContentChild('success') success: TemplateRef<unknown>;
  @ContentChild('failed') failed: TemplateRef<unknown>;
  @ContentChild('pending') pending: TemplateRef<unknown>;

  @Input() requestState: fromApiStatus.ApiRequestState;
}
