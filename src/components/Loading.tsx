import React from 'react';
import MDSpinner from 'react-md-spinner';

import { useStyles } from '@/components/Message';

interface ILoadingProps {
  isHidden?: boolean;
}

const Loading: React.SFC<ILoadingProps> = ({ isHidden }) => {
  const classes = useStyles();
  return isHidden ? null : (
    <div className={classes.message}>
      <MDSpinner size={30} />
    </div>
  );
};

export default Loading;
