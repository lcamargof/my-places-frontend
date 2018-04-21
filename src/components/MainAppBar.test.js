import React from 'react';
import { shallow } from 'enzyme';
import { MainAppBar } from './MainAppBar';
import { shallowToJson } from 'enzyme-to-json';

describe('Component: MainAppBar', () => {
  it('Should render correctly', () => {
    const component = shallow(<MainAppBar classes={{}} places={[]} onFilter={jest.fn()} />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});