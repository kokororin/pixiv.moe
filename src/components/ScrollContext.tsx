import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  context: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  contextInnerContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    boxOrient: 'vertical',
    boxDirection: 'normal',
    flexDirection: 'column',
    overflowY: 'auto',
    overflowX: 'hidden',
    position: 'relative',
    WebkitOverflowScrolling: 'touch'
  }
});

const ScrollContext: React.FC<{}> = props => {
  const classes = useStyles();

  return (
    <div className={classes.context}>
      <div className={classes.contextInnerContainer}>{props.children}</div>
    </div>
  );
};

export default ScrollContext;
