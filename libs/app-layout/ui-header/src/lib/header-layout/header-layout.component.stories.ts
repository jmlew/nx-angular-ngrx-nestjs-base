import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { AppHeaderLayoutComponent } from './header-layout.component';

const sharedModules = [SharedExternalLibrariesModule];

export default {
  title: 'AppHeaderLayoutComponent',
  component: AppHeaderLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [...sharedModules],
    }),
  ],
} as Meta<AppHeaderLayoutComponent>;

const Template: Story<AppHeaderLayoutComponent> = (args: AppHeaderLayoutComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  isAuth: false,
};
