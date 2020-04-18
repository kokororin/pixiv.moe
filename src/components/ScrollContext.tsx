import React from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EventListener, { withOptions } from 'react-event-listener';
import Content from '@/components/Content';

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

const ScrollContext: React.FunctionComponent<{}> = props => {
  const classes = useStyles();
  const location = useLocation();

  const cacheKey = `'@@SCROLL/'${location.pathname}`;

  const onScroll = (event: React.UIEvent) => {
    const scrollingElement = Content?.getElement();
    const target = event.target as HTMLElement;
    if (target.className === scrollingElement?.className) {
      const scrollTop = String(target.scrollTop);
      sessionStorage.setItem(cacheKey, scrollTop);
    }
  };

  React.useEffect(() => {
    const scrollingElement = Content?.getElement();
    const scrollTop = sessionStorage.getItem(cacheKey);
    if (scrollTop && scrollingElement) {
      scrollingElement.scrollTop = Number(scrollTop);
    }
  }, [location.pathname]);

  return (
    <div className={classes.context}>
      <div className={classes.contextInnerContainer}>{props.children}</div>
      <EventListener
        target={document}
        // @ts-ignore
        onScroll={withOptions(onScroll, {
          capture: true
        })}
      />
    </div>
  );
};

export default ScrollContext;
