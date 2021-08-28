import React, {
  useContext,
  useImperativeHandle,
  forwardRef,
  createRef
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import scrollTo from '../utils/scrollTo';
import { SiteContext } from '../stores/SiteStore';

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
}

const Content = forwardRef<ContentHandles, ContentProps>((props, ref) => {
  const classes = useStyles();
  const containerRef = createRef<HTMLDivElement>();
  const site = useContext(SiteContext);

  if (!site) {
    return null;
  }

  site.setContentClassName(classes.container);

  useImperativeHandle(ref, () => ({
    toTop: () => {
      if (containerRef.current) {
        scrollTo(containerRef.current, 0, 900, 'easeInOutQuint');
      }
    }
  }));
  return (
    <div ref={containerRef} className={classes.container}>
      {props.children}
    </div>
  );
});

export default Content;
