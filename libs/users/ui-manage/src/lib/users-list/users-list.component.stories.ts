import * as usersDb from '@app/mock-api/assets/db/users.json';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';
import { User } from '@app/users/domain';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { UsersListComponent } from './users-list.component';

const sharedModules = [SharedExternalLibrariesModule];

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'Jason',
    email: 'jason@localhost.com',
  },
  {
    id: 2,
    name: 'System',
    email: 'system@localhost.com',
  },
  {
    id: 3,
    name: 'Administrator',
    email: 'admin@localhost.com',
  },
];

export default {
  title: 'UsersListComponent',
  component: UsersListComponent,
  decorators: [
    moduleMetadata({
      imports: [...sharedModules],
    }),
  ],
} as Meta<UsersListComponent>;

const Template: Story<UsersListComponent> = (args: UsersListComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  users: sampleUsers,
};
