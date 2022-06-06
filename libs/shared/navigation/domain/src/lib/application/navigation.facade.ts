import { BehaviorSubject, Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';

import * as fromUtils from '../entities/normalise.util';
import { orderedRootRouteNames } from '../entities/routes.constant';
import { RouteName } from '../entities/routes.enum';
import { RouteItem } from '../entities/routes.model';
import { NavigationDataService } from '../infrastructure/navigation.data.service';

@Injectable({ providedIn: 'root' })
export class NavigationFacade {
  private routeItemsSubject = new BehaviorSubject<RouteItem[]>([]);
  routeItems$: Observable<RouteItem[]> = this.routeItemsSubject.asObservable();

  constructor(private dataService: NavigationDataService) {}

  /**
   * Loads the available route names from the server and maps to route items.
   */
  loadRoutes(): void {
    this.dataService
      .getAllNavigationFeatureNames()
      .pipe(map(fromUtils.mapRouteNamesToRouteItems))
      .subscribe({
        next: (routeItems: RouteItem[]) => {
          this.routeItemsSubject.next(routeItems);
        },
        error: (err) => {
          console.error('Error loading route items:', err);
        },
      });
  }

  /**
   * Returns all available route items.
   */
  getAllRootRouteItems(): RouteItem[] {
    return fromUtils.mapRouteNamesToRouteItems(orderedRootRouteNames);
  }

  getRootItem(routeName: RouteName): RouteItem {
    return fromUtils.getRootItem(routeName);
  }
}
