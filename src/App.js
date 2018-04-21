import React, { Component } from 'react';
import { Button, withStyles } from 'material-ui';
import io from "socket.io-client";
import Axios from 'axios';
import HelpIcon from '@material-ui/icons/HelpOutline';
import MainAppBar from './components/MainAppBar';
import Map from './components/Map';
import HelpDialog from './components/HelpDialog';
import { API_URL } from './utils/config';
import AppSnackbar from './components/AppSnackbar';

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
    places: [],
    search: '',
    place: null,
    help: false,
    confirm: false,
    form: false,
    snackbar: false,
    selected: null,
    message: '',
  };

  async componentDidMount() {
    // Listen to actions
    this.socketActions();

    // Fetch places
    try {
      const { data } = await Axios.get(`${API_URL}/api/places`);

      if (data.success) {
         this.setState({ places: data.data.map(p => {
           p.location = [+p.lon, +p.lat];

           return p;
         }) });
      }
    } catch (e) {
      console.error('error fetching places', e);
    }
  }

  socketActions = () => {
    const socket = io(API_URL);
    // ADD
    socket.on('add', this.addPlace);

    // UPDATE
    socket.on('update', this.updatePlace);

    // REMOVE
    socket.on('remove', this.removePlace);
  };

  handleFilter = (place) => {
    this.setState({ place });
  };

  addPlace = (place) => {
    this.showSnackbar('Place Added!');
    this.setState(prevState => ({ places: [...prevState.places, place] }));
  };

  handleAddPlace = async (place) => {
    try {
      const { data } = await Axios.post(`${API_URL}/api/places`, place);

      if (!data.success) {
        this.showSnackbar('Error adding the place :(');
      }
    } catch (e) {
      this.showSnackbar('Server error :(');
    }
  };

  updatePlace = (place) => {
    this.showSnackbar('Place updated!');

    const index = this.state.places.findIndex(p => p.id === place.id);

    this.setState(prevState => ({
      places: [
        ...prevState.places.slice(0, index),
        place,
        ...prevState.places.slice(index + 1)
      ]
    }))
  };

  handlePlaceUpdate = async  (place) => {
    try {
      const { data } = await Axios.put(`${API_URL}/api/places/${place.id}`, place);

      if (!data.success) {
        this.showSnackbar('Error updating the place :(');
      }
    } catch (e) {
      this.showSnackbar('Server error :(');
    }
  };

  removePlace = (id) => {
    this.showSnackbar('Place removed :(');

    const index = this.state.places.findIndex(p => p.id === +id);

    this.setState(prevState => ({
      places: [
        ...prevState.places.slice(0, index),
        ...prevState.places.slice(index + 1)
      ]
    }));
  };

  handlePlaceRemove = async (place) => {
    try {
      const { data } = await Axios.delete(`${API_URL}/api/places/${place.id}`);

      if (!data.success) {
        this.showSnackbar("The place doesn't want to be destroyed!")
      }
    } catch (e) {
      this.showSnackbar('Server error :(');
    }
  };

  toggleHelp = help => this.setState({ help });

  closeSnackbar = () => this.setState({ snackbar: false });

  showSnackbar = (message) => {
    this.setState({ message, snackbar: true })
  };

  render() {
    const { classes } = this.props;
    const { places, place, help, snackbar, message } = this.state;

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
        <AppSnackbar text={message} open={snackbar} onClose={this.closeSnackbar} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
