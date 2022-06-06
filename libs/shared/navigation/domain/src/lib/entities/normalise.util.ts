import { orderedRootRouteNames, rootRoutesMap } from './routes.constant';
import { RouteName } from './routes.enum';
import { RouteItem } from './routes.model';

export function mapRouteNamesToRouteItems(names: (RouteName | string)[]): RouteItem[] {
  return names
    .filter((name: RouteName | string) =>
      orderedRootRouteNames.includes(name as RouteName)
    )
    .map((name: RouteName | string) => rootRoutesMap.get(name as RouteName) as RouteItem)
    .sort(
      (a, b) =>
        orderedRootRouteNames.indexOf(a.name) - orderedRootRouteNames.indexOf(b.name)
    );
}

export function getRootItem(routeName: RouteName): RouteItem {
  return rootRoutesMap.get(routeName as RouteName) as RouteItem;
}
