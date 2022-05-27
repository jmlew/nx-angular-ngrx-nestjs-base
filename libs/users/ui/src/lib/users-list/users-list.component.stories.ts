import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';
import { UserProfile } from '@app/users/domain';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { UsersListComponent } from './users-list.component';

const sharedModules = [SharedExternalLibrariesModule];

const sampleUsers: UserProfile[] = [
  {
    userId: 1,
    userName: 'Jason',
    emailId: 'jason@localhost.com',
  },
  {
    userId: 2,
    userName: 'System',
    emailId: 'system@localhost.com',
  },
  {
    userId: 3,
    userName: 'Administrator',
    emailId: 'admin@localhost.com',
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
