import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AutoCompleteInput from './AutoCompleteInput';

export default {
  title: 'AutoCompleteInput',
  component: AutoCompleteInput,
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

const Template: Story = (args: any) => <AutoCompleteInput {...args} />;

export const Default = Template.bind({});
// Default.args = {
//   primary: true,
//   label: 'AutoCompleteInput',
// };

