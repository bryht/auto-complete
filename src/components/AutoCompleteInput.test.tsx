import React from 'react';
import ReactDOM from 'react-dom';
import AutoCompleteInput from './AutoCompleteInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AutoCompleteInput
    id="test"
    options={[]}
    placeholder=""
    className=""
    inputClassName=""
    listClassName=""
    onChange={() => { }}
    onKeyDown={() => { }}
    value=""
  />, div);
});