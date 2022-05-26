import * as fromUtils from '@app/shared/api-status/util';
import { SharedUiCommonModule } from '@app/shared/ui-common';
import { Meta, Story, moduleMetadata } from '@storybook/angular';

import { ApiStatusComponent } from './api-status.component';

const sharedModules = [SharedUiCommonModule];

export default {
  title: 'Shared/ApiStatus',
  component: ApiStatusComponent,
  decorators: [
    moduleMetadata({
      imports: [...sharedModules],
    }),
  ],
} as Meta<ApiStatusComponent>;

const Template: Story<ApiStatusComponent> = (args: ApiStatusComponent) => ({
  props: args,
});

export const Idle = Template.bind({});
Idle.args = {
  requestState: fromUtils.getApiStatusInit(),
};
export const Pending = Template.bind({});
Pending.args = {
  requestState: fromUtils.getApiStatusPending(),
};
export const Success = Template.bind({});
Success.args = {
  requestState: fromUtils.getApiStatusSuccess(),
};
export const Error = Template.bind({});
Error.args = {
  requestState: fromUtils.getApiStatusError('Some error has occured!'),
};
