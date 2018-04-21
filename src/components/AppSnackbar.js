import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Snackbar, withStyles } from 'material-ui';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const AppSnackbar = ({ classes, text, onClose, open }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    SnackbarContentProps={{
      'aria-describedby': 'snackbar-msg',
    }}
    message={<span id="snackbar-msg">{ text }</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={this.handleClose}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
);

AppSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppSnackbar);