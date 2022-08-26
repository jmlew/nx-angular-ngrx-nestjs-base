import { Observable, combineLatest, map, take } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationFacade, RouteItem } from '@app/shared/navigation/domain';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],
})
export class AppRootComponent implements OnInit {
  isAppReady$: Observable<boolean>;

  constructor(
    private readonly router: Router,
    private navigationFacade: NavigationFacade
  ) {}

  ngOnInit() {
    this.initialiseApp();
  }

  onGoToRoute(item: RouteItem) {
    this.router.navigate([item.name]);
  }

  /**
   * Initialises app by loading a collection of dependancy APIs.
   *
   * TODO: Load all depemndant APIs and map the response statuses to the ready state.
   */
  private initialiseApp() {
    console.log('App is initialising.');

    this.isAppReady$ = combineLatest([this.navigationFacade.routeItems$]).pipe(
      map(([routeItems]) => true),
      take(1)
    );
    this.navigationFacade.loadRoutes();
  }
}
