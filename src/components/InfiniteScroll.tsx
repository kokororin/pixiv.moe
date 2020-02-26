import React from 'react';
import EventListener from 'react-event-listener';

interface IInfiniteScrollProps {
  distance: number;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export default class InfiniteScroll extends React.Component<
  IInfiniteScrollProps
> {
  onScroll = (event: React.UIEvent) => {
    if (this.props.isLoading) {
      return;
    }

    if (!this.props.hasMore) {
      return;
    }

    const target = event.target as HTMLElement;
    const targetHeight = target.clientHeight;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;

    if (scrollTop + targetHeight - scrollHeight > -1 * this.props.distance) {
      this.props.onLoadMore();
    }
  };

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
            // @ts-ignore
            onScroll={this.onScroll}
          />
        )}
      </>
    );
  }
}
