import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import EventListener, { withOptions } from 'react-event-listener';

const styles = {
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
};

@withRouter
@withStyles(styles)
export default class ScrollContext extends React.Component {
  static prefix = '@@SCROLL/';

  componentDidUpdate(prevProps) {
    if (this.props.location === prevProps.location) {
      return;
    }
    const scrollTop = sessionStorage.getItem(this.cacheKey);
    if (scrollTop && this.scrollingElement) {
      this.scrollingElement.scrollTop = scrollTop;
    }
  }

  @autobind
  onScroll(event) {
    if (event.target.className === this.scrollingElement.className) {
      const scrollTop = event.target.scrollTop;
      sessionStorage.setItem(this.cacheKey, scrollTop);
    }
  }

  get cacheKey() {
    return `${ScrollContext.prefix}${this.props.location.pathname}`;
  }

  get scrollingElement() {
    return document.querySelector('[data-component="Content"]');
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
          onScroll={withOptions(this.onScroll, {
            capture: true
          })}
        />
      </div>
    );
  }
}
