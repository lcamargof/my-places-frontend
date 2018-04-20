import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, withStyles } from 'material-ui';
import { ADD_ACTION } from '../utils/constants';

const styles = () => ({
  hours: {
    display: 'flex',
    flexDirection: 'row',
  },
  open: {
    marginRight: '16px',
  },
});

const defaultState = {
  id: undefined,
  name: '',
  nameError: '',
  description: '',
  descriptionError: '',
  open: '08:00',
  openError: '',
  close: '20:00',
  closeError: '',
  location: [],
};

class PlaceFormDialog extends Component {

  state = { ...defaultState };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) return;

    if (nextProps.type === ADD_ACTION) {
      this.setState({ ...defaultState, location: nextProps.place.location });
    } else {
      this.setState({ ...nextProps.place });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  validation() {
    const fields = ['name', 'description', 'open', 'close'];
    const errors = {};

    for (let field of fields) {
      if (!this.state[field].trim().length) {
        errors[`${field}Error`] = 'This field is required';
      }

      if ((field === 'open' || field === 'close') && !errors[`${field}Error`]) {
        if (!moment(this.state[field], 'HH:mm').isValid()) {
          errors[`${field}Error`] = 'Invalid hour';
        }
      }
    }

    if (Object.keys(errors).length) {
      this.setState(errors);
      return false;
    } else {
      return true;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validation()) {
      const { id, name, description, location, open, close } = this.state;
      const data = { name, description, location, open, close };

      if (id) data.id = id;

      this.props.onSubmit(data);
    }
  };

  render() {
    const { onClose, classes, type } = this.props;
    const {
      name,
      nameError,
      description,
      descriptionError,
      open,
      openError,
      close,
      closeError
    } = this.state;

    const title = type === ADD_ACTION ? 'Add your place!' : 'Edit your place :)';

    return (
      <Dialog
        open={this.props.open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <TextField
              id="name"
              label="Name"
              fullWidth
              error={!!nameError}
              helperText={nameError}
              value={name}
              onChange={this.handleChange('name')}
              placeholder="I'm sure it will be a cool name"
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              placeholder="Describe it!"
              multiline
              error={!!descriptionError}
              helperText={descriptionError}
              value={description}
              onChange={this.handleChange('description')}
              fullWidth
              margin="normal"
            />
            <div className={classes.hours}>
              <TextField
                id="open"
                label="Open"
                placeholder="12:00"
                margin="normal"
                type="time"
                error={!!openError}
                helperText={openError}
                value={open}
                fullWidth
                onChange={this.handleChange('open')}
                className={classes.open}
              />
              <TextField
                id="close"
                label="Close"
                type="time"
                error={!!closeError}
                helperText={closeError}
                value={close}
                fullWidth
                onChange={this.handleChange('close')}
                placeholder="23:00"
                margin="normal"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

PlaceFormDialog.propTypes = {
  place: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

PlaceFormDialog.defaultProps = {
  place: {},
};

export default withStyles(styles)(PlaceFormDialog);