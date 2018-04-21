import React from 'react';
import { shallow } from 'enzyme';
import HelpDialog from './HelpDialog';
import { shallowToJson } from 'enzyme-to-json';

describe('Component: HelpDialog', () => {
  it('Should render correctly', () => {
    const component = shallow(<HelpDialog open={true} onClose={jest.fn()}/>);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});