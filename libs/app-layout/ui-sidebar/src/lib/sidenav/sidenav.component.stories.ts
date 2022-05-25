import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';
import { RouteItem, RouteName } from '@app/shared/navigation/domain';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { SidenavComponent } from './sidenav.component';

const routeItems: RouteItem[] = [
  { name: RouteName.Home, path: '/home', label: 'Home', icon: 'home' },
  { name: RouteName.Users, path: '/users', label: 'User Profiles', icon: 'group' },
  { name: RouteName.Settings, path: '/settings', label: 'Settings', icon: 'settings' },
  {
    name: RouteName.Workitems,
    path: '/workitems',
    label: 'Workitems',
    icon: 'exit_to_app',
  },
  { name: RouteName.Reports, path: '/reports', label: 'Reports', icon: 'bar_chart' },
];

export default {
  title: 'SidenavComponent',
  component: SidenavComponent,
  decorators: [
    moduleMetadata({
      imports: [SharedExternalLibrariesModule],
    }),
  ],
} as Meta<SidenavComponent>;

const Template: Story<SidenavComponent> = (args: SidenavComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  routeItems,
};
