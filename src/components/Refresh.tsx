import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Fab } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

const useStyles = makeStyles({
  floatBtn: {
    position: 'fixed',
    right: 40,
    bottom: 40,
    zIndex: 1000
  }
});

interface RefreshProps {
  onClick: () => void;
}

const Refresh: React.FC<RefreshProps> = props => {
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
