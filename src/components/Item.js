import styles from '@/styles/Item.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import Icon from 'react-mdl/lib/Icon';

@CSSModules(styles, { allowMultiple: true })
export default class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    masonry: PropTypes.object
  };

  constructor(props) {
    super(props);
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

  @autobind
  onImageError() {
    this.imgRef.src = require('@/images/img-fail.jpg');
    typeof this.props.masonryRef !== 'undefined' &&
      this.props.masonryRef.performLayout();
  }

  renderRankText() {
    if (this.props.item.previous_rank === 0) {
      return <span styleName="rank-text-outer no-previous-rank">初登场</span>;
    }
    let icon;
    if (this.props.item.previous_rank < this.props.item.rank) {
      icon = <Icon styleName="trending_down" name="trending_down" />;
    } else {
      icon = <Icon styleName="trending_up" name="trending_up" />;
    }
    return (
      <span styleName="rank-text-outer">
        {icon} {'前日 ' + this.props.item.previous_rank + '位'}
      </span>
    );
  }

  render() {
    return this.props.item.hasOwnProperty('work') ? (
      <div styleName="cell" onMouseMove={this.onImageMouseMove}>
        <Link styleName="link" to={`/illust/${this.props.item.work.id}`}>
          <div styleName="image-wrapper">
            <img
              ref={ref => (this.imgRef = ref)}
              src={this.props.item.work.image_urls.px_480mw}
              onError={this.onImageError}
            />
          </div>
          <div styleName="title">
            <span>{this.props.item.work.title}</span>
          </div>
          <div styleName="meta">
            <span styleName="rank-num">{`${this.props.item.rank}位`}</span>
            <span>{this.renderRankText()}</span>
          </div>
        </Link>
      </div>
    ) : (
      <div styleName="cell" onMouseMove={this.onImageMouseMove}>
        <Link styleName="link" to={`/illust/${this.props.item.id}`}>
          <div styleName="image-wrapper">
            <img
              ref={ref => (this.imgRef = ref)}
              src={this.props.item.image_urls.px_480mw}
              onError={this.onImageError}
            />
          </div>
          <div styleName="title">
            <span>{this.props.item.title}</span>
          </div>
          <div styleName="meta">
            <span styleName="count">
              <Icon name="star" />
              {this.props.item.stats.favorited_count.public +
                this.props.item.stats.favorited_count.private}
            </span>
          </div>
        </Link>
      </div>
    );
  }
}
