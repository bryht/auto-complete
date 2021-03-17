import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import AutoCompeteInput from './AutoCompeteInput';

export default {
  title: 'AutoCompeteInput',
  component: AutoCompeteInput,
  args: {
    id: '',
    options: ['a','b','cc','ddee'],
    placeholder: 'placeholder',
    inputClassName: '',
    listClassName:'',
    onKeyDown: (key: string) => {},
    onChange: (value: string) => {},
    value: ''
  },
} as Meta;

const Template: Story = (args: any) => <AutoCompeteInput {...args} />;

export const Default = Template.bind({});
// Default.args = {
//   primary: true,
//   label: 'AutoCompeteInput',
// };

