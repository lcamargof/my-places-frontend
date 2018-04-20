import React, { Component } from 'react';
import { Button, withStyles } from 'material-ui';
import HelpIcon from '@material-ui/icons/HelpOutline';
import MainAppBar from './components/MainAppBar';
import Map from './components/Map';
import HelpDialog from './components/HelpDialog';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});

class App extends Component {
  state = {
    places: [
      { id: 1, name: 'Test', location: [-103.40932570000001, 20.6713195] },
      { id: 2, name: 'Test 2', location: [-103.41932570000001, 20.6713195] },
      { id: 3, name: 'Test 3', location: [-103.40932570000001, 20.6913195] },
    ],
    search: '',
    place: null,
    help: false,
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

  toggleHelp = help => this.setState({ help });

  render() {
    const { classes } = this.props;
    const { places, place, help } = this.state;

    return (
      <div className="App">
        <MainAppBar places={this.state.places} onFilter={this.handleFilter} />
        <Map places={places} place={place} onUpdate={this.handlePlaceUpdate} />
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
