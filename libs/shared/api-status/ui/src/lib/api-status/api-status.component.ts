import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import * as fromApiStatus from '@app/shared/api-status/util';
import { isApiStatusFailed } from '@app/shared/api-status/util';

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
  state: fromApiStatus.ApiState;
  isErrorShown: boolean;

  @ContentChild('idle') idle: TemplateRef<unknown>;
  @ContentChild('success') success: TemplateRef<unknown>;
  @ContentChild('failed') failed: TemplateRef<unknown>;
  @ContentChild('pending') pending: TemplateRef<unknown>;

  /**
   * Input setter used to update the local state of the error message.
   */
  @Input() set requestState(state: fromApiStatus.ApiState) {
    this.isErrorShown = isApiStatusFailed(state);
    this.state = state;
  }
  @Input() displayType: DisplayType = 'replace';
  @Output() dismissError = new EventEmitter<void>();

  /**
   * Removes the error message and exmits a corresponding event to ensure parent state is
   * updated to reflect the dismissal of the status.
   */
  onDismissError() {
    this.isErrorShown = false;
    this.dismissError.emit();
  }
}
