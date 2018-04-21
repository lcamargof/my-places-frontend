import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import * as mockSocket from 'mock-socket';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { App } from './App';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({ on: jest.fn(), getCenter: jest.fn() }))
}));

// jest.mock('axios', () => ({
//   get: new Promise(resolve => resolve({ data: { success: true } })),
//   post: new Promise(resolve => resolve({ data: { success: true } })),
//   put: new Promise(resolve => resolve({ data: { success: true } })),
//   delete: new Promise(resolve => resolve({ data: { success: true } })),
// }));

jest.mock('socket.io-client', () => {
  return mockSocket.SocketIO;
});

const response = {
  data: {
    success: true,
    data: [{ id: 1 }]
  }
};

const axiosMock = new MockAdapter(Axios)
  .onGet().reply(200, response)
  .onPost().reply(200, response)
  .onPut().reply(200, response)
  .onDelete().reply(200, response);

describe('Container: App', () => {
  let component;
  const buildComponent = () => {
    return shallow(<App classes={{}} />);
  };

  describe('Snapshots', () => {
    it('Should render correctly', () => {
      component = buildComponent();
      expect(shallowToJson(component)).toMatchSnapshot();
    });
  });

  describe('Methods', () => {
    it('Should add a place correctly', () => {
      component = buildComponent();
      component.instance().addPlace({ id: 1 });
      expect(component.state().places.length).toBe(1);
    });

    it('Should update a place correctly', () => {
      component = buildComponent();
      const newPlace = { id: 1, name: 'hola' };
      component.instance().updatePlace(newPlace);
      expect(component.state().places[0]).toBe(newPlace);
    });

    it('Should destroy a place correctly', () => {
      component = buildComponent();
      component.instance().removePlace(1);
      expect(component.state().places.length).toBe(0);
    });
  });

  describe('Actions', () => {
    it('Click on the help button should open the dialog', () => {
      component = buildComponent();
      component.find('#help').simulate('click');
      expect(component.state().help).toBeTruthy();
    });
  });
});