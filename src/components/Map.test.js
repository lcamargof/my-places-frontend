import React from 'react';
import { shallow } from 'enzyme';
import Map from './Map';
import { ADD_ACTION, EDIT_ACTION } from '../utils/constants';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({ on: jest.fn(), getCenter: jest.fn() }))
}));

describe('Component: Map', () => {
  let component = null;
  var places, onAdd, place, onUpdate, onDelete;

  beforeEach(() => {
    places = [
      { name: 'test', open: '00:00', close: '23:59', description: 'test', location: [10, 10] }
    ];
    place = undefined;
    onAdd = jest.fn();
    onDelete = jest.fn();
    onUpdate = jest.fn();
  });

  const buildComponent = () => {
    const props = {
      places, onAdd, place, onUpdate, onDelete
    };

    return shallow(<Map {...props} />);
  };

  describe('Render', () => {
    it('Should render correctly', () => {
      component = buildComponent();
    });
  });

  describe('Methods', () => {
    it('renderLayers: Should render the correct number of layers', () => {
      component = buildComponent();
      expect(component.instance().renderLayers(places).length).toBe(1);
    });

    it('handleSubmit: should call the correct method', () => {
      component = buildComponent();

      // ADD
      component.setState({ type: ADD_ACTION });
      component.instance().handleSubmit({});
      expect(onAdd).toHaveBeenCalledTimes(1);
      // EDIT
      component.setState({ type: EDIT_ACTION });
      component.instance().handleSubmit({});
      expect(onUpdate).toHaveBeenCalledTimes(1);
    });

    it('Should set place on prop update', () => {
      component = buildComponent();
      const place = {};
      component.setProps({ place });
      expect(component.state().place).toBe(place);
    });
  });
});