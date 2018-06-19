import React from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends React.Component {
  static scrollingClassName = 'mdl-layout__content';

  static propTypes = {
    distance: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.scrollingElement.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.scrollingElement.removeEventListener('scroll', this.onScroll);
  }

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
    return document.querySelector(`.${InfiniteScroll.scrollingClassName}`);
  }

  render() {
    return this.props.children;
  }
}
