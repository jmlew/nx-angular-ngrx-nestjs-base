import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

// import { RouteItem } from '../../shared/models';
// TODO: import shared routes.

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarComponent {
  routes: string[] = ['foo', 'bar', 'baz'];
  @Output() navItemClick = new EventEmitter<string>();
}
