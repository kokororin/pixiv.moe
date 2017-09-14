import React from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
export default class ScrollContext extends React.Component {
  static prefix = '@@SCROLL/';
  static scrollingClassName = 'mdl-layout__content';

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, true);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location === prevProps.location) {
      return;
    }
    const scrollTop = sessionStorage.getItem(this.cacheKey);
    if (scrollTop && this.scrollingElement) {
      this.scrollingElement.scrollTop = scrollTop;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll, true);
  }

  @autobind
  onScroll(event) {
    if (event.target.className === ScrollContext.scrollingClassName) {
      const scrollTop = event.target.scrollTop;
      sessionStorage.setItem(this.cacheKey, scrollTop);
    }
  }

  get cacheKey() {
    return `${ScrollContext.prefix}${this.props.location.pathname}`;
  }

  get scrollingElement() {
    return document.querySelector(`.${ScrollContext.scrollingClassName}`);
  }

  render() {
    return this.props.children;
  }
}
