import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AutoCompeteInput from './AutoCompeteInput';

export default {
  title: 'AutoCompeteInput',
  component: AutoCompeteInput,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    inputValue: '',
    disabled: false,
    required: false,
  },
} as Meta;

const Template: Story = (args: any) => <AutoCompeteInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  primary: true,
  label: 'AutoCompeteInput',
};

