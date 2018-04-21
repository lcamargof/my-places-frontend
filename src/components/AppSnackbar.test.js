import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { AppSnackbar } from './AppSnackbar';

describe('Component: AppSnackbar', () => {
  it('Should render correctly', () => {
    const component = shallow(<AppSnackbar classes={{}} text="test" onClose={jest.fn()} open={true} />);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});