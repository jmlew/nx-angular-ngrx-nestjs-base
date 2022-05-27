import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { BaseDataService } from '@app/shared/util-http';

/* Data service to retrieve the route item names from the server which depend on the user
permissions.
*/

enum ApiEndpoint {
  Base = 'api',
  Navigation = 'navigation',
  Features = 'features',
}

@Injectable({ providedIn: 'root' })
export class NavigationDataService {
  private baseUrl = `${ApiEndpoint.Base}/${ApiEndpoint.Navigation}`;

  constructor(private data: BaseDataService) {}

  getAllNavigationFeatureNames(): Observable<string[]> {
    const url = `${this.baseUrl}/${ApiEndpoint.Features}`;
    return this.data.get<string[]>(url);
    // return of([RouteName.Home, RouteName.Users]);
  }
}
