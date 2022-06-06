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

  <ng-template #success>success content here</ng-template>
  <ng-template #failed>failed content here</ng-template>
  <ng-template #pending>pending content here</ng-template>
  <ng-template #idle>idle content here</ng-template>
*/

// TODO: Convert this to be used only for loading states in which the main ontent is
// hidden on loading or errors. Use another version for use with update / create states,
// in which the switch statememts allow for the main content to remain visible upon
// pending and errors, allowing the consumer to show failed and pending states inline with
// the content being updated / created (eg. forms ro grids)

@Component({
  selector: 'app-api-status',
  templateUrl: './api-status.component.html',
  styleUrls: ['./api-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiStatusComponent {
  readonly ApiStatus = fromApiStatus.ApiStatus;
  @ContentChild('idle') idle: TemplateRef<unknown>;
  @ContentChild('success') success: TemplateRef<unknown>;
  @ContentChild('failed') failed: TemplateRef<unknown>;
  @ContentChild('pending') pending: TemplateRef<unknown>;

  @Input() requestState: fromApiStatus.ApiRequestState;
}
