import { RouteName } from './routes.enum';
import { RouteItem } from './routes.model';

export const orderedRouteNames: RouteName[] = [
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
export const rootRoutesMap: Map<RouteName, RouteItem> = new Map();
rootRoutesMap.set(RouteName.Home, {
  name: RouteName.Home,
  path: '/home',
  label: 'Home',
  icon: 'home',
});
rootRoutesMap.set(RouteName.Users, {
  name: RouteName.Users,
  path: '/users',
  label: 'User Profiles',
  icon: 'group',
});
rootRoutesMap.set(RouteName.Settings, {
  name: RouteName.Settings,
  path: '/settings',
  label: 'Settings',
  icon: 'settings',
});
rootRoutesMap.set(RouteName.Workitems, {
  name: RouteName.Workitems,
  path: '/workitems',
  label: 'Workitems',
  icon: 'exit_to_app',
});
rootRoutesMap.set(RouteName.Reports, {
  name: RouteName.Reports,
  path: '/reports',
  label: 'Reports',
  icon: 'bar_chart',
});
console.log('rootRoutesMap', rootRoutesMap);
