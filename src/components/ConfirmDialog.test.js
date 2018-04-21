import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ConfirmDialog from './ConfirmDialog';

describe('Component: ConfirmDialog', () => {
  let component = null;
  var place, open, onClose, onConfirm;

  beforeEach(() => {
    open = true;
    place = { name: 'test', open: '00:00', close: '23:59', description: '' };
    onClose = jest.fn();
    onConfirm = jest.fn();
  });

  const buildComponent = () => {
    const props = {
      place, open, onClose, onConfirm
    };

    return shallow(<ConfirmDialog {...props} />);
  };

  describe('Snapshots', () => {
    it('Should render correctly', () => {
      component = buildComponent();
      expect(shallowToJson(component)).toMatchSnapshot();
    });
  });

  describe('Actions', () => {
    it('Should trigger cancel when clicked the cancel button', () => {
      component = buildComponent();
      component.find('#confirm-cancel').simulate('click');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('Should trigger delete when clicked the delete button', () => {
      component = buildComponent();
      component.find('#confirm-delete').simulate('click');
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });
  });
});