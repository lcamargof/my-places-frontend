import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { ADD_ACTION, EDIT_ACTION } from '../utils/constants';
import { PlaceFormDialog } from './PlaceFormDialog';

const mockPlace = { name: 'test', open: '00:00', close: '23:59', description: 'test' };

describe('Component: PlaceFormDialog', () => {
  let component = null;
  var classes, place, onClose, onSubmit, type;

  beforeEach(() => {
    classes = {};
    place = undefined;
    onClose = jest.fn();
    onSubmit = jest.fn();
    type = EDIT_ACTION;
  });

  const buildComponent = () => {
    const props = {
      classes, place, onClose, onSubmit, type
    };

    return shallow(<PlaceFormDialog {...props} />);
  };

  describe('Snapshots', () => {
    it('Should render correctly (EDIT)', () => {
      component = buildComponent();
      expect(shallowToJson(component)).toMatchSnapshot();
    });

    it('Should render correctly (ADD)', () => {
      place = { location: []};
      type = ADD_ACTION;
      component = buildComponent();
      expect(shallowToJson(component)).toMatchSnapshot();
    });
  });

  describe('Actions', () => {
    it('Should trigger close when clicked the cancel button', () => {
      component = buildComponent();
      component.find('#close-place-form').simulate('click');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('Should trigger submit when clicked the delete button', () => {
      component = buildComponent();
      component.setProps({ place: mockPlace });
      component.find('#submit-place-form').simulate('click', { preventDefault: jest.fn() });
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('Should trigger submit when the form is submitted', () => {
      component = buildComponent();
      component.setProps({ place: mockPlace });
      component.find('#place-form').simulate('submit', { preventDefault: jest.fn() });
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('Should validate the form correctly', () => {
      component = buildComponent();
      component.setProps({ place: mockPlace });
      expect(component.instance().validation()).toBeTruthy();

      component.setProps({ place: Object.assign({}, mockPlace, { name: '' }) });
      expect(component.instance().validation()).toBeFalsy();
    });
  });
});