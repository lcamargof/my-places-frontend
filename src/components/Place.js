import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Delete';
import { IconButton, withStyles } from 'material-ui';

const styles = () => ({
  root: {
    width: '180px'
  },
  title: {
    textAlign: 'center',
    marginTop: 0,
  },
  open: {
    color: 'green',
  },
  close: {
    color: 'red',
  },
  button: {
    curosr: 'pointer',
  },
  btnContainer: {
    textAlign: 'center',
  },
  list: {

  },
});

const Place = ({ classes, place, onDelete, onEdit }) => (
  <div className={classes.root}>
    <h2 className={classes.title}>
      {place.name}
    </h2>
    <ul className={classes.list}>
      <li>Prop 1</li>
      <li>Prop 2</li>
      <li>Prop 3</li>
    </ul>
    <div className={classes.btnContainer}>
      <IconButton onClick={onEdit} className={classes.button} aria-label="Edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={onDelete} className={classes.button} aria-label="Delete">
        <RemoveIcon />
      </IconButton>
    </div>
  </div>
);

Place.propTypes = {
  place: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Place);