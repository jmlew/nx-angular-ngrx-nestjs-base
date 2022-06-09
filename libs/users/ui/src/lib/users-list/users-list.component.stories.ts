import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';
import { UserProfile } from '@app/users/domain';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { UsersListComponent } from './users-list.component';

const sharedModules = [SharedExternalLibrariesModule];

const sampleUsers: UserProfile[] = [
  {
    userId: `userId${1}`,
    userName: 'Jason',
    emailId: 'jason@localhost.com',
    password: 'xxxx',
    isLocked: 'Y',
    isInactive: 'Y',
    lastLoginDatetime: '2020-01-01T00:00:00.000Z',
    userRoles: [],
  },
  {
    userId: `userId${2}`,
    userName: 'System',
    emailId: 'system@localhost.com',
    password: 'xxxx',
    isLocked: 'Y',
    isInactive: 'Y',
    lastLoginDatetime: '2020-02-01T00:00:00.000Z',
    userRoles: [],
  },
  {
    userId: `userId${3}`,
    userName: 'Administrator',
    emailId: 'admin@localhost.com',
    password: 'xxxx',
    isLocked: 'Y',
    isInactive: 'Y',
    lastLoginDatetime: '2020-03-01T00:00:00.000Z',
    userRoles: [],
  },
];

export default {
  title: 'Users/UsersList',
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
