import '../styles/Item.scss';

import React from 'react';
import { Link } from 'react-router-component';
import { Icon } from 'react-mdl';

export default class Item extends React.Component {

  static propTypes = {
    item: React.PropTypes.object,
    index: React.PropTypes.number,
    masonry: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.onImageMouseMove = ::this.onImageMouseMove;
    this.onImageError = ::this.onImageError;
  }

  shouldComponentUpdate() {
    return false;
  }

  onImageMouseMove(event) {
    event = event.nativeEvent;
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
      target.style.transformOrigin = `${event.offsetX}px ${event.offsetY}px`;
    }
  }

  onImageError() {
    this.imgRef.src = require('../images/img-fail.jpg');
    typeof this.props.masonryRef !== 'undefined' && this.props.masonryRef.performLayout();
  }

  render() {
    return (
      <div
        className={ 'cell' }
        onMouseMove={ this.onImageMouseMove }>
        <Link
          className={ 'illust' }
          href={ `/illust/${this.props.item.id}` }>
        <div className={ 'image-wrapper' }>
          <img
            ref={ (ref) => this.imgRef = ref }
            src={ this.props.item.image_urls.px_480mw }
            onError={ this.onImageError } />
        </div>
        </Link>
        <div className={ 'title' }>
          <a
            target={ '_blank' }
            href={ `/#/${this.props.item.id}` }>
            { this.props.item.title }
          </a>
        </div>
        <div className={ 'meta' }>
          <span className={ 'count' }><Icon name={ 'star' } /> { this.props.item.stats.favorited_count.public + this.props.item.stats.favorited_count.private }</span>
        </div>
      </div>
      );
  }
}
