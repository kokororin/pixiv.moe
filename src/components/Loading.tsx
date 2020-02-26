import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import MDSpinner from 'react-md-spinner';

import { styles } from '@/components/Message';

interface ILoadingProps extends WithStyles<typeof styles> {
  isHidden?: boolean;
}

const Loading = withStyles(styles)(({ isHidden, classes }: ILoadingProps) => {
  return isHidden ? null : (
    <div className={classes.message}>
      <MDSpinner size={30} />
    </div>
  );
});

export default Loading;
