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

  <app-api-status [displayType]="'replace'" [requestState]="requestState$ | async">
    <ng-template #success>success content here</ng-template>
    <ng-template #failed>failed content here</ng-template>
    <ng-template #pending>pending content here</ng-template>
    <ng-template #idle>idle content here</ng-template>
  </app-api-status>
*/

/**
 * Determines the display type of the success content, where 'inline' shows it by default
 * and below the other states and 'replace' shows it only when status is 'success'.
 *
 * Recommend using 'inline' for write status and 'replace' for read status to ensure the
 * main content is not shown until the successful response when loading content and is
 * shown while the other states are cycled through for updating or creating data.
 */
export type DisplayType = 'inline' | 'replace';

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
  @Input() displayType: DisplayType = 'replace';
}
