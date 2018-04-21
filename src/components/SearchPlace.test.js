import React from 'react';
import { shallow } from 'enzyme';
import { SearchPlace } from './SearchPlace';
import { shallowToJson } from 'enzyme-to-json';

describe('Component: SearchPlace', () => {
  it('Should render correctly', () => {
    shallow(<SearchPlace classes={{}} places={[]} onFilter={jest.fn()} />);
  });
});