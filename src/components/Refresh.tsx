import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, FabProps } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  floatBtn: {
    position: 'fixed',
    right: 40,
    bottom: 40,
    zIndex: 1000
  }
});

interface IRefreshProps extends FabProps {
  onClick: () => void;
}

const Refresh: React.SFC<IRefreshProps> = (props: IRefreshProps) => {
  const classes = useStyles();
  return (
    <div className={classes.floatBtn}>
      <Fab color="secondary" {...props}>
        <RefreshIcon />
      </Fab>
    </div>
  );
};

export default Refresh;
