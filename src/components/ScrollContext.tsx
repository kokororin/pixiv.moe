import React, { useEffect, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useEventListener } from 'ahooks';
import { makeStyles } from '@material-ui/core/styles';
import { SiteContext } from '../stores/SiteStore';

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
  const location = useLocation();

  const cacheKey = useMemo(() => {
    return `'@@SCROLL/'${location.pathname}`;
  }, [location.pathname]);

  const site = useContext(SiteContext);

  const onScroll = (event: React.UIEvent) => {
    const scrollingElement = site.contentElement;
    const target = event.target as HTMLElement;
    if (target.className === scrollingElement?.className) {
      const scrollTop = String(target.scrollTop);
      sessionStorage.setItem(cacheKey, scrollTop);
    }
  };

  useEventListener('scroll', onScroll, {
    target: document,
    capture: true
  });

  useEffect(() => {
    const scrollingElement = site.contentElement;
    const scrollTop = sessionStorage.getItem(cacheKey);
    if (scrollTop && scrollingElement) {
      setTimeout(() => {
        scrollingElement.scrollTop = Number(scrollTop);
      });
    }
  }, [location.pathname, site.contentElement, cacheKey]);

  return (
    <div className={classes.context}>
      <div className={classes.contextInnerContainer}>{props.children}</div>
    </div>
  );
};

export default ScrollContext;
