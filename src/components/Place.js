import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import moment from 'moment';
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
    marginBottom: '-10px',
  },
  description: {
    marginBottom: 0,
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
    fontSize: '14px',
  },
  status: {
    textAlign: 'center',
  },
});

const Place = ({ classes, place, onDelete, onEdit }) => {

  const open = moment().isBetween(moment(place.open, 'HH:mm'), moment(place.close, 'HH:mm'), 'hours', '[]');

  return (
    <div className={classes.root}>
      <h2 className={classNames(classes.title, open ? classes.open : classes.close)}>
        {place.name}
      </h2>
      <p className={classes.description}>{ place.description }</p>
      <div className={classes.btnContainer}>
        <IconButton onClick={onEdit} className={classes.button} aria-label="Edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} className={classes.button} aria-label="Delete">
          <RemoveIcon />
        </IconButton>
      </div>
    </div>
  )
};

Place.propTypes = {
  place: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Place);