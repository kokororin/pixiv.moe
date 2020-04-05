import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

interface IScrollContentProps {}

const ScrollContext: React.SFC<IScrollContentProps> = props => {
  const classes = useStyles();

  return (
    <div className={classes.context}>
      <div className={classes.contextInnerContainer}>{props.children}</div>
    </div>
  );
};

export default ScrollContext;
