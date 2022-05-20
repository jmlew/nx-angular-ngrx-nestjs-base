import { Component, EventEmitter, Input, Output } from '@angular/core';

// import { RouteItem } from '../../shared/models';
// TODO: import shared routes entities.

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input() routes: string[];
  @Output() itemClick = new EventEmitter<string>();
}
