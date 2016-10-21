import '../styles/Item.scss';

import React from 'react';
import { Icon, Tooltip } from 'react-mdl';
import ImageLoader from 'react-imageloader';

export default class Item extends React.Component {

  static propTypes = {
    item: React.PropTypes.object,
    onImageClick: React.PropTypes.func,
    onFavouriteClick: React.PropTypes.func,
    onImageLoad: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  onImageClick(event) {
    event.nativeEvent.preventDefault();
    this.props.onImageClick();
  }

  onFavouriteClick(event) {
    event.nativeEvent.preventDefault();
    this.props.onFavouriteClick();
  }

  render() {
    return (
      <div className={ 'cell' }>
        <a
          href={ '#' }
          onClick={ this.onImageClick.bind(this) }>
          <ImageLoader
            src={ this.props.item.image_urls.px_480mw }
            wrapper={ React.DOM.div }
            preloader={ () => <img src={ require('../images/kotori.jpg') } /> }
            onLoad={ () => this.props.onImageLoad() }>
            { <img src={ require('../images/kotori-cry.jpg') } /> } </ImageLoader>
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
              onClick={ this.onFavouriteClick.bind(this) }
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
