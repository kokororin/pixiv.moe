import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';

const styles = {
  floatBtn: {
    position: 'fixed',
    right: 40,
    bottom: 40,
    zIndex: 1000
  }
};

const Refresh = ({ classes, ...props }) => (
  <div className={classes.floatBtn}>
    <Button variant="fab" color="secondary" aria-label="add" {...props}>
      <RefreshIcon />
    </Button>
  </div>
);

Refresh.propTypes = {
  onClick: PropTypes.func
};

export default withStyles(styles)(Refresh);
