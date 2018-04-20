import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogContentText, DialogTitle, withStyles } from 'material-ui';

const styles = () => ({

});

const HelpDialog = ({ classes, open, onClose }) => (
  <Dialog onClose={onClose} open={open} aria-labelledby="help-dialog">
    <DialogTitle>Instructions</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Easy instructions to use my places!
        <ul>
          <li>Right click on the map to add a place</li>
          <li>Drag the place to change their location</li>
          <li>Click on the place to know more about it</li>
          <li>When you click on a place, you can edit or remove it, do as you wish!</li>
          <li>Enjoy using myPlaces</li>
        </ul>
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

HelpDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(HelpDialog)