import { RouteName } from './routes.enum';

export interface RouteItem {
  name: RouteName;
  label?: string;
  path?: string;
  icon?: string;
}
