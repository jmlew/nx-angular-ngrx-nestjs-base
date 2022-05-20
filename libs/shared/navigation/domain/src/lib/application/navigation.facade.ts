import { BehaviorSubject, Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';

import { mapRouteNamesToRouteItems } from '../entities/normalise.util';
import { RouteItem } from '../entities/routes.model';
import { NavigationDataService } from '../infrastructure/navigation.data.service';

@Injectable({ providedIn: 'root' })
export class NavigationFacade {
  private routeItemsSubject = new BehaviorSubject<RouteItem[]>([]);
  routeItems$: Observable<RouteItem[]> = this.routeItemsSubject.asObservable();

  constructor(private dataService: NavigationDataService) {}

  /**
   * Load the route names from the server and map to route items.
   */
  loadRoutes(): void {
    this.dataService
      .getAllNavigationFeatureNames()
      .pipe(map(mapRouteNamesToRouteItems))
      .subscribe({
        next: (routeItems: RouteItem[]) => {
          this.routeItemsSubject.next(routeItems);
        },
        error: (err) => {
          console.error('Error loading route items:', err);
        },
      });
  }
}