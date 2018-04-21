import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, withStyles, Toolbar, Typography } from 'material-ui';
import SearchPlace from './SearchPlace';

const styles = () => ({
  search: { width: 250, float: 'right' },
  flex: { flex: 1 },
});

const MainAppBar = ({ classes, ...props }) => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Typography className={classes.flex} variant="title" color="inherit">
        My Places
      </Typography>
      <SearchPlace {...props} className={classes.search} />
    </Toolbar>
  </AppBar>
);

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  places: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainAppBar);