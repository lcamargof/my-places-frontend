import React, { Component } from 'react';
import { Button, withStyles } from 'material-ui';
import HelpIcon from '@material-ui/icons/HelpOutline';
import MainAppBar from './components/MainAppBar';
import Map from './components/Map';
import HelpDialog from './components/HelpDialog';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    position: 'fixed',
    bottom: 0,
    right: 0,
  }
});

class App extends Component {
  state = {
    places: [
      { id: 1, name: 'Awesome place', open: '00:00', close: '23:00', description: 'asdf', location: [-103.40932570000001, 20.6713195] },
      { id: 2, name: 'OH GOD', open: '15:00', close: '16:00', description: 'asdf', location: [-103.41932570000001, 20.6713195] },
      { id: 3, name: 'ROCKET!', open: '19:00', close: '20:00', description: 'adsdf', location: [-103.40932570000001, 20.6913195] },
    ],
    search: '',
    place: null,
    help: false,
    confirm: false,
    form: false,
    selected: null,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => (
        this.setState({ location: [position.coords.longitude, position.coords.latitude] })
      ));
    }
  }

  handleFilter = (place) => {
    this.setState({ place });
  };

  handleAddPlace = (place) => {
    place.id = Math.floor(Math.random() * 100000000);

    this.setState(prevState => ({ places: [...prevState.places, place] }));
  };

  handlePlaceUpdate = (place) => {
    const index = this.state.places.findIndex(p => p.id === place.id);

    this.setState(prevState => ({
      places: [
        ...prevState.places.slice(0, index),
        place,
        ...prevState.places.slice(index + 1)
      ]
    }))
  };

  handlePlaceRemove = (place) => {
    const index = this.state.places.findIndex(p => p.id === place.id);

    this.setState(prevState => ({
      places: [
        ...prevState.places.slice(0, index),
        ...prevState.places.slice(index + 1)
      ]
    }));
  };

  toggleHelp = help => this.setState({ help });

  render() {
    const { classes } = this.props;
    const { places, place, help } = this.state;

    return (
      <div className="App">
        <MainAppBar places={this.state.places} onFilter={this.handleFilter} />
        <Map
          places={places}
          place={place}
          onAdd={this.handleAddPlace}
          onUpdate={this.handlePlaceUpdate}
          onDelete={this.handlePlaceRemove}
        />
        <Button
          variant="fab"
          color="primary"
          aria-label="help"
          className={classes.button}
          onClick={() => this.toggleHelp(true)}
        >
          <HelpIcon />
        </Button>
        <HelpDialog open={help} onClose={() => this.toggleHelp(false)} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
