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
      'on',
    ],
    placeholder: 'placeholder',
    inputClassName: '',
    listClassName: '',

    onChange: (value: string) => { console.log(value) },
  },
} as Meta;

const Template: Story = (args: any) => {
  const [value, setValue] = useState(args.value ?? '');
  return (
    <AutoCompleteInput
      {...args}
      onInputValueChanged={(value) => {
        setValue(value);
      }}
      onKeyDown={(key) => { if (key === 'Enter') { alert(value) } }}
      inputValue={value}
    />
  );
};

export const Default = Template.bind({});