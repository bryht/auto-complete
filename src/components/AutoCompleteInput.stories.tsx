import React, { useState } from 'react';
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

    onChange: (value: string) => { console.log(value) },
  },
} as Meta;

// const Template: Story = (args: any) => <AutoCompleteInput {...args} />;

// Default.args = {
//   primary: true,
//   label: 'AutoCompleteInput',
// };

const Template: Story = (args: any) => {
  const [value, setValue] = useState(args.value ?? '');
  return (
    <AutoCompleteInput
      {...args}
      onChange={(value) => {
        setValue(value);
      }}
      onKeyDown={(key) => { if (key === 'Enter') { debugger; alert(value) } }}
      inputValue={value}
    />
  );
};

export const Default = Template.bind({});