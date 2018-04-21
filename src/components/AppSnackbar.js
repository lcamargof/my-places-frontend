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

export const AppSnackbar = ({ classes, text, onClose, open }) => (
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
        id="close-snackbar"
        color="inherit"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
);

AppSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AppSnackbar);