import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { useStyles } from './Message';

const Loading: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.message}>
      <CircularProgress size={30} />
    </div>
  );
};

export default Loading;
