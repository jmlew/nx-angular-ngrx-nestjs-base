import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NavigationFacade, RouteItem } from '@app/shared/navigation/domain';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarComponent {
  // Loaded via initialisation logic in main app shell.
  routeItems$: Observable<RouteItem[]> = this.navigationFacade.routeItems$;

  @Output() navItemClick = new EventEmitter<RouteItem>();

  constructor(private navigationFacade: NavigationFacade) {}
}
