import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import { DEFAULT_COORDINATES, MAPBOX_TOKEN } from '../utils/config';
import Place from './Place';
import ConfirmDialog from './ConfirmDialog';
import PlaceFormDialog from './PlaceFormDialog';
import { ADD_ACTION, EDIT_ACTION } from '../utils/constants';

const MapBox = ReactMapboxGl({ accessToken: MAPBOX_TOKEN });

class Map extends Component {

  state = {
    location: DEFAULT_COORDINATES,
    zoom: [11],
    place: undefined,
    confirm: false,
    form: false,
    type: ADD_ACTION,
  };

  componentDidMount() {
    // Get current client position
    // It throw if it takes more than 10 seconds because if it happens after
    // It creates a weird transition
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => (
        this.setState({ location: [position.coords.longitude, position.coords.latitude] })
      ), err => console.log('err', err), { timeout: 10000 });
    }
  }

  componentWillReceiveProps(nextProps) {
    // React when the user filter a place using the search bar and set it active
    if (nextProps.place !== this.props.place && nextProps.place !== this.state.place) {
      this.setState({ place: nextProps.place, location: nextProps.place.location, zoom: [14] });
    }
  }

  handleClick = ({ feature }, place) => {
    this.setState({
      location: feature.geometry.coordinates,
      zoom: [14],
      place,
      type: EDIT_ACTION
    });
  };

  onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }

  onDrag = () => {
    this.setState({ place: undefined });
  };

  onDragEnd = ({ lngLat }, place) => {
    this.props.onUpdate(Object.assign({}, place, { location: [lngLat.lng, lngLat.lat] }));
  };

  addPlace = (evt, { lngLat }) => {
    this.setState({ place: { location: [lngLat.lng, lngLat.lat] }, type: ADD_ACTION });
    this.toggleForm(true);
  };

  handleEdit = () => {
    this.toggleForm(true);
  };

  handleRemove = () => {
    this.props.onDelete(this.state.place);
    this.setState({ place: undefined });
    this.toggleConfirm(false);
  };

  toggleForm = form => this.setState({ form });

  toggleConfirm = confirm => this.setState({ confirm });

  handleSubmit = (place) => {
    if (this.state.type === ADD_ACTION) {
      this.props.onAdd(place);
    } else {
      this.props.onUpdate(place);
    }

    this.setState({ place: undefined });
    this.toggleForm(false);
  };

  renderLayers = (places) => {
    const layers = places.map(p => (
      <Layer
        key={p.id}
        id={`${p.id}`}
        type="symbol"
        layout={{
          "icon-image": "rocket-15",
          "text-field": p.name,
          "text-offset": [0, 1.5],
          "icon-size": 1.8,
        }}>
        <Feature
          onMouseEnter={e => this.onToggleHover('pointer', e)}
          onMouseLeave={e => this.onToggleHover('', e)}
          coordinates={p.location}
          onClick={e => this.handleClick(e, p)}
          draggable
          onDragStart={this.onDrag}
          onDragEnd={e => this.onDragEnd(e, p)}
        />
      </Layer>
    ));

    return layers;
  };

  render() {
    const { location, place, zoom, type, confirm, form } = this.state;
    const { places } = this.props;

    return (
      <React.Fragment>
        <MapBox
          style="mapbox://styles/mapbox/streets-v9"
          center={location}
          zoom={zoom}
          onClick={this.onDrag}
          onDrag={this.onDrag}
          onContextMenu={this.addPlace}
          containerStyle={{
            height: "calc(100vh - 64px)",
            width: "100vw",
          }}>
          {
            this.renderLayers(places)
          }
          {
            place && place.name && (
              <Popup key={place.id} coordinates={place.location}>
                <Place
                  place={place}
                  onDelete={() => this.toggleConfirm(true)}
                  onEdit={this.handleEdit}
                />
              </Popup>
            )
          }
        </MapBox>
        <ConfirmDialog
          open={confirm}
          place={this.state.place}
          onConfirm={this.handleRemove}
          onClose={() => this.toggleConfirm(false)}
        />
        <PlaceFormDialog
          type={type}
          place={place}
          open={form}
          onSubmit={this.handleSubmit}
          onClose={() => this.toggleForm(false)}
        />
      </React.Fragment>
    );
  }
}

Map.propTypes = {
  places: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  place: PropTypes.object,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Map;