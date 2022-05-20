import { orderedRouteNames, rootRoutesMap } from './routes.constant';
import { RouteName } from './routes.enum';
import { RouteItem } from './routes.model';

export function mapRouteNamesToRouteItems(names: string[]): RouteItem[] {
  return names
    .filter((name: string) => orderedRouteNames.includes(name as RouteName))
    .map((name: string) => rootRoutesMap.get(name as RouteName) as RouteItem)
    .sort(
      (a, b) => orderedRouteNames.indexOf(a.name) - orderedRouteNames.indexOf(b.name)
    );
}
