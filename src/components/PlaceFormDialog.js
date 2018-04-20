import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, withStyles } from 'material-ui';
import { ADD_ACTION } from '../utils/constants';

const styles = () => ({

});

class PlaceFormDialog extends Component {

  render() {
    const { onClose, onSubmit, type, place, open } = this.props;

    const title = type === ADD_ACTION ? 'Add your place!' : 'Edit your place :)';

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          HOLI
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
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