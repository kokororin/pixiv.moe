import React from 'react';
import H from 'history';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import EventListener, { withOptions } from 'react-event-listener';
import Content from '@/components/Content';

const styles = createStyles({
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

interface IScrollContentProps extends WithStyles<typeof styles> {
  location: H.Location;
}

const ScrollContext = withStyles(styles)(
  class ScrollContext extends React.Component<IScrollContentProps> {
    static prefix = '@@SCROLL/';

    componentDidUpdate(prevProps: IScrollContentProps) {
      if (this.props.location === prevProps.location) {
        return;
      }
      const scrollTop = sessionStorage.getItem(this.cacheKey);
      if (scrollTop && this.scrollingElement) {
        this.scrollingElement.scrollTop = Number(scrollTop);
      }
    }

    onScroll = (event: React.UIEvent) => {
      const target = event.target as HTMLElement;
      if (target.className === this.scrollingElement?.className) {
        const scrollTop = String(target.scrollTop);
        sessionStorage.setItem(this.cacheKey, scrollTop);
      }
    };

    get cacheKey() {
      return `${ScrollContext.prefix}${this.props.location.pathname}`;
    }

    get scrollingElement() {
      return Content.getElement();
    }

    render() {
      const { classes } = this.props;

      return (
        <div className={classes.context}>
          <div className={classes.contextInnerContainer}>
            {this.props.children}
          </div>
          <EventListener
            target={document}
            // @ts-ignore
            onScroll={withOptions(this.onScroll, {
              capture: true
            })}
          />
        </div>
      );
    }
  }
);

export default ScrollContext;
