import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import { DEFAULT_COORDINATES, MAPBOX_TOKEN } from '../utils/config';
import { IMAGES } from '../utils/images';

const MapBox = ReactMapboxGl({ accessToken: MAPBOX_TOKEN });

class Map extends Component {

  state = {
    location: DEFAULT_COORDINATES,
    zoom: [11],
    place: null,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => (
        this.setState({ location: [position.coords.longitude, position.coords.latitude] })
      ));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.place !== this.props.place && nextProps.place !== this.state.place) {
      this.setState({ place: nextProps.place, location: nextProps.place.location, zoom: [14] });
    }
  }

  handleClick = ({ feature }, place) => {
    this.setState({
      location: feature.geometry.coordinates,
      zoom: [14],
      place
    });
  };

  onToggleHover(cursor, { map }) {
    map.getCanvas().style.cursor = cursor;
  }

  onDrag = () => {
    this.setState({ place: null });
  };

  onDragEnd = ({ lngLat }, place) => {
    this.props.onUpdate(Object.assign({}, place, { location: [lngLat.lng, lngLat.lat] }));
  };

  render() {
    const { location, place, zoom } = this.state;
    const { places } = this.props;

    return (
      <MapBox
        style="mapbox://styles/mapbox/streets-v9"
        center={location}
        zoom={zoom}
        onClick={this.onDrag}
        onDrag={this.onDrag}
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>
        {
          places.map(p => (
            <Layer
              key={p.id}
              id={'' + p.id}
              type="symbol"
              images={IMAGES}
              layout={{
                "icon-image": "place",
                "text-field": p.name,
                "text-offset": [0, 1.5]
              }}>
              <Feature
                onMouseEnter={e => this.onToggleHover('pointer', e)}
                onMouseLeave={e => this.onToggleHover('', e)}
                coordinates={p.location}
                onClick={e => this.handleClick(e, p)}
                draggable
                onDragEnd={e => this.onDragEnd(e, p)}
              />
            </Layer>
          ))
        }
        {
          place && (
            <Popup key={place.id} coordinates={place.location}>
              { place.name }
            </Popup>
          )
        }
      </MapBox>
    );
  }
}

export default Map;