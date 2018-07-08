import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MDSpinner from 'react-md-spinner';

import { styles } from '@/components/Message';

const Loading = ({ isHidden, classes }) => {
  return isHidden ? null : (
    <div className={classes.message}>
      <MDSpinner size={30} />
    </div>
  );
};

Loading.propTypes = {
  isHidden: PropTypes.bool
};

export default withStyles(styles)(Loading);
