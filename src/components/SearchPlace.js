import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MenuItem, Paper, TextField, InputAdornment } from 'material-ui';
import SearchIcon from '@material-ui/icons/Search';
import Downshift from 'downshift';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem && selectedItem.name || '').indexOf(suggestion.name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(places, inputValue) {
  let count = 0;

  return places.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    width: '250px'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

const SearchPlace = ({ classes, places, onFilter }) => {
  return (
    <div>
      <Downshift onChange={onFilter} itemToString={item => item ? item.name : ''}>
        {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: 'Find your place!',
                id: 'search',
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }),
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(places, inputValue).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    </div>
  );
};

SearchPlace.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchPlace);