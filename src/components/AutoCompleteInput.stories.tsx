import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AutoCompeteInput from './AutoCompeteInput';

export default {
  title: 'AutoCompeteInput',
  component: AutoCompeteInput,
  parameters: {
    layout: 'centered',
  },
  args: {
    id: '',
    options: [
      'off',
      'office',
      'different',
      'staff',
      'offers',
      'offer',
    ],
    placeholder: 'placeholder',
    inputClassName: '',
    listClassName: '',
    onKeyDown: (key: string) => { if (key === 'Enter') alert(key) },
    onChange: (value: string) => { console.log(value) },
    value: ''
  },
} as Meta;

const Template: Story = (args: any) => <AutoCompeteInput {...args} />;

export const Default = Template.bind({});
// Default.args = {
//   primary: true,
//   label: 'AutoCompeteInput',
// };

