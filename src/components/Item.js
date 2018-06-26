import styles from '@/styles/Item.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import StarIcon from '@material-ui/icons/Star';

@CSSModules(styles, { allowMultiple: true })
export default class Item extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    masonry: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      hasLoaded: false
    };
  }

  componentDidMount() {
    this.wait = setInterval(() => {
      if (!this.imgRef) {
        return;
      }
      const width = this.imgRef.naturalWidth;
      const height = this.imgRef.naturalHeight;
      const offsetWidth = this.wrapper.offsetWidth;
      if (width && height) {
        this.setState({
          width: offsetWidth,
          // eslint-disable-next-line prettier/prettier
          height: (offsetWidth * height) / width
        });
        clearInterval(this.wait);
      }
    }, 30);
  }

  componentWillUnmount() {
    this.wait && clearInterval(this.wait);
  }

  onImageMouseMove(event) {
    event = event.nativeEvent;
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
      target.style.transformOrigin = `${event.offsetX}px ${event.offsetY}px`;
    }
  }

  @autobind
  onImageLoad() {
    this.setState({
      hasLoaded: true
    });
    this.wait && clearInterval(this.wait);
  }

  @autobind
  onImageError() {
    this.imgRef.src = require('@/images/img-fail.jpg');
    typeof this.props.masonryRef !== 'undefined' &&
      this.props.masonryRef.performLayout();
    this.wait && clearInterval(this.wait);
  }

  renderRankText() {
    if (this.props.item.previous_rank === 0) {
      return (
        <span styleName="rank-text-outer no-previous-rank">
          <FormattedMessage id="Debut" />
        </span>
      );
    }

    const icon =
      this.props.item.previous_rank < this.props.item.rank ? (
        <TrendingDownIcon style={{ color: '#3f51b5' }} />
      ) : (
        <TrendingUpIcon style={{ color: '#d32f2f' }} />
      );

    return (
      <span styleName="rank-text-outer">
        {icon}
        <FormattedMessage
          id="Yesterday x rank"
          values={{ rank: this.props.item.previous_rank }}
        />
      </span>
    );
  }

  render() {
    const isRank = this.props.item.hasOwnProperty('work');
    return (
      <div styleName="cell" onMouseMove={this.onImageMouseMove}>
        <Link
          styleName="link"
          to={`/illust/${
            isRank ? this.props.item.work.id : this.props.item.id
          }`}>
          <div ref={ref => (this.wrapper = ref)} styleName="image-wrapper">
            <img
              src={require('@/images/img-placeholder.gif')}
              width={this.state.width}
              height={this.state.height}
              style={{
                display: this.state.hasLoaded ? 'none' : 'block'
              }}
            />
            <img
              style={{
                display: this.state.hasLoaded ? 'block' : 'none'
              }}
              ref={ref => (this.imgRef = ref)}
              src={
                isRank
                  ? this.props.item.work.image_urls.px_480mw
                  : this.props.item.image_urls.px_480mw
              }
              onLoad={this.onImageLoad}
              onError={this.onImageError}
            />
          </div>
          <div styleName="title">
            <span>
              {isRank ? this.props.item.work.title : this.props.item.title}
            </span>
          </div>
          {isRank ? (
            <div styleName="meta">
              <span styleName="rank-num">
                <FormattedMessage
                  id="x rank"
                  values={{ rank: this.props.item.rank }}
                />
              </span>
              <span>{this.renderRankText()}</span>
            </div>
          ) : (
            <div styleName="meta">
              <span styleName="count">
                <StarIcon />
                {this.props.item.stats.favorited_count.public +
                  this.props.item.stats.favorited_count.private}
              </span>
            </div>
          )}
        </Link>
      </div>
    );
  }
}
