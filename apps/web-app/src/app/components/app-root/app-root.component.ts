import { Observable, combineLatest, map, take } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicformFacade } from '@app/shared/dynamicform/domain';
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
    private navigationFacade: NavigationFacade,
    private dynamicformFacade: DynamicformFacade
  ) {}

  ngOnInit() {
    this.initialiseApp();
  }

  onGoToRoute(item: RouteItem) {
    this.router.navigate([item.name]);
  }

  /**
   * Initialises app by loading a collection of APIs which are dependant for the app to function.

   * TODO: Ensure each stream emits values which represent a successful load of data only
   * once the API response is retrieved. Since each of the below use BehaviourSubjects
   * with default intial values.
   * TODO: Add error and loading streams to ensure API state is reflected in the UI.
   */
  private initialiseApp() {
    console.log('App is initialising.');

    this.isAppReady$ = combineLatest([
      this.navigationFacade.routeItems$,
      this.dynamicformFacade.formConfigList$,
    ]).pipe(
      map(([routeItems, formConfigList]) => true),
      take(1)
    );

    this.dynamicformFacade.loadConfigs();
    this.navigationFacade.loadRoutes();
  }
}
