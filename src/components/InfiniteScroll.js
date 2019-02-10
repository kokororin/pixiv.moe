import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';

export default class InfiniteScroll extends React.Component {
  static propTypes = {
    distance: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  @autobind
  onScroll(event) {
    if (this.props.isLoading) {
      return;
    }

    if (!this.props.hasMore) {
      return;
    }

    const target = event.target,
      targetHeight = target.clientHeight,
      scrollTop = target.scrollTop,
      scrollHeight = target.scrollHeight;

    if (scrollTop + targetHeight - scrollHeight > -1 * this.props.distance) {
      this.props.onLoadMore();
    }
  }

  get scrollingElement() {
    return document.querySelector('[data-component="Content"]');
  }

  render() {
    return (
      <>
        {this.props.children}
        {this.scrollingElement && (
          <EventListener
            target={this.scrollingElement}
            onScroll={this.onScroll}
          />
        )}
      </>
    );
  }
}
