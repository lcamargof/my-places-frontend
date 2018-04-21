import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Place } from './Place';

describe('Component: Place', () => {
  let component = null;
  var classes, place, onEdit, onDelete;

  beforeEach(() => {
    classes = {};
    place = { name: 'test', open: '00:00', close: '23:59', description: '' };
    onDelete = jest.fn();
    onEdit = jest.fn();
  });

  const buildComponent = () => {
    const props = {
      classes, place, onEdit, onDelete
    };

    return shallow(<Place {...props} />);
  };

  describe('Snapshots', () => {
    it('Should render correctly', () => {
      component = buildComponent();
      expect(shallowToJson(component)).toMatchSnapshot();
    });
  });

  describe('Actions', () => {
    it('Should trigger edit when clicked the edit button', () => {
      component = buildComponent();
      component.find('#place-edit').simulate('click');
      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it('Should trigger delete when clicked the delete button', () => {
      component = buildComponent();
      component.find('#place-delete').simulate('click');
      expect(onDelete).toHaveBeenCalledTimes(1);
    });
  });
});