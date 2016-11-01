import '../styles/Item.scss';

import React from 'react';
import { Icon, Tooltip } from 'react-mdl';
import ImageLoader from 'react-imageloader';

export default class Item extends React.Component {

  static propTypes = {
    item: React.PropTypes.object,
    index: React.PropTypes.number,
    onImageClick: React.PropTypes.func,
    onFavouriteClick: React.PropTypes.func,
    onImageLoad: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.onImageClick = ::this.onImageClick;
    this.onFavouriteClick = ::this.onFavouriteClick;
  }

  shouldComponentUpdate() {
    return false;
  }

  onImageClick(event) {
    event.nativeEvent.preventDefault();
    this.props.onImageClick(this.props.index);
  }

  onFavouriteClick(event) {
    event.nativeEvent.preventDefault();
    this.props.onFavouriteClick(this.props.item.id, event);
  }

  render() {
    return (
      <div className={ 'cell' }>
        <a
          href={ '#' }
          onClick={ this.onImageClick }>
          <ImageLoader
            src={ this.props.item.image_urls.px_480mw }
            wrapper={ React.DOM.div }
            preloader={ () => <img src={ require('../images/img-loading.jpg') } /> }
            onLoad={ () => this.props.onImageLoad() }>
            { <img src={ require('../images/img-fail.jpg') } /> } </ImageLoader>
        </a>
        <div className={ 'title' }>
          <a
            target={ '_blank' }
            href={ `/#/${this.props.item.id}` }>
            { this.props.item.title }
          </a>
        </div>
        <div className={ 'meta' }>
          <Tooltip
            label={ 'ブックマークに追加' }
            position={ 'top' }>
            <a
              href={ '#' }
              onClick={ this.onFavouriteClick }
              className={ 'count' }>
              <Icon name={ 'star' } />
              { this.props.item.stats.favorited_count.public + this.props.item.stats.favorited_count.private }
            </a>
          </Tooltip>
        </div>
      </div>
      );
  }
}
