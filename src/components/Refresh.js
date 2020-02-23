import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

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
    <Fab color="secondary" {...props}>
      <RefreshIcon />
    </Fab>
  </div>
);

Refresh.propTypes = {
  onClick: PropTypes.func
};

export default withStyles(styles)(Refresh);
