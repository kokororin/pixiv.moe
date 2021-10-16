import React, { useImperativeHandle, forwardRef, createRef } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import scrollTo from '../utils/scrollTo';

const useStyles = makeStyles({
  container: {
    width: '100%',
    position: 'relative',
    display: 'inline-block',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1,
    zIndex: 1,
    WebkitOverflowScrolling: 'touch'
  }
});

interface ContentProps {
  children: React.ReactNode;
}

export interface ContentHandles {
  toTop: () => void;
  getContainer: () => Element | null;
}

const Content = forwardRef<ContentHandles, ContentProps>((props, ref) => {
  const classes = useStyles();
  const containerRef = createRef<HTMLDivElement>();

  useImperativeHandle(ref, () => ({
    toTop: () => {
      if (containerRef.current) {
        scrollTo(containerRef.current, 0, 900, 'easeInOutQuint');
      }
    },
    getContainer: () => {
      return containerRef?.current;
    }
  }));
  return (
    <div ref={containerRef} className={classes.container}>
      {props.children}
    </div>
  );
});

export default Content;
