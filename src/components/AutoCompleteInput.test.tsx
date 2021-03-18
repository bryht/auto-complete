import React from 'react';
import AutoCompleteInput from './AutoCompleteInput';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders without crashing', async () => {
  render(<AutoCompleteInput
    id="test"
    options={[]}
    placeholder="test1"
    className=""
    inputClassName=""
    listClassName=""
    onChange={() => { }}
    onKeyDown={() => { }}
    value=""
  />);
  screen.debug();
  expect(screen.getByPlaceholderText('test1')).toBeInTheDocument();
});