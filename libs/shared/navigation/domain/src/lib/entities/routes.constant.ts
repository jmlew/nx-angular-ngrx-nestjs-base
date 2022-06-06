import { RouteName } from './routes.enum';
import { RouteItem } from './routes.model';

export const orderedRootRouteNames: RouteName[] = [
  RouteName.Home,
  RouteName.Users,
  RouteName.Settings,
  RouteName.Workitems,
  RouteName.Reports,
];

/**
 * Route config defining the details for each page which is navigated to via the router.
 * This will be dynamically loaded via an app init API call once this is configured.
 */
export const rootRoutesMap: Map<RouteName, RouteItem> = new Map([
  [
    RouteName.Home,
    {
      name: RouteName.Home,
      path: '/home',
      label: 'Home',
      icon: 'home',
    },
  ],
  [
    RouteName.Users,
    {
      name: RouteName.Users,
      path: '/users',
      label: 'User Profiles',
      icon: 'group',
    },
  ],
  [
    RouteName.Settings,
    {
      name: RouteName.Settings,
      path: '/settings',
      label: 'Settings',
      icon: 'settings',
    },
  ],
  [
    RouteName.Workitems,
    {
      name: RouteName.Workitems,
      path: '/workitems',
      label: 'Workitems',
      icon: 'exit_to_app',
    },
  ],
  [
    RouteName.Reports,
    {
      name: RouteName.Reports,
      path: '/reports',
      label: 'Reports',
      icon: 'bar_chart',
    },
  ],
]);
