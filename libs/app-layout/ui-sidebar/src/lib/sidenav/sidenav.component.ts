import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouteItem } from '@app/shared/navigation/domain';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() routeItems: RouteItem[];
  @Output() itemClick = new EventEmitter<RouteItem>();
}
