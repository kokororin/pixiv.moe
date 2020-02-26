import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

const styles = createStyles({
  floatBtn: {
    position: 'fixed',
    right: 40,
    bottom: 40,
    zIndex: 1000
  }
});

interface IRefreshProps extends WithStyles<typeof styles> {
  onClick: () => void;
  [key: string]: any;
}

const Refresh = withStyles(styles)(({ classes, ...props }: IRefreshProps) => (
  <div className={classes.floatBtn}>
    <Fab color="secondary" {...props}>
      <RefreshIcon />
    </Fab>
  </div>
));

export default withStyles(styles)(Refresh);
