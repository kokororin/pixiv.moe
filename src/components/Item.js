import '../styles/Item.scss';
import '!style!css!material-design-icons/iconfont/material-icons.css';
import '../styles/MaterialIcons.scss';

import React from 'react';
import { formatPattern } from 'react-router/lib/PatternUtils';

export default class Item extends React.Component {

  static propTypes = {
    item: React.PropTypes.object,
    onImageClick: React.PropTypes.func,
    onFavouriteClick: React.PropTypes.func
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
          onClick={ this.onImageClick.bind(this) }><img src={ this.props.item.image_urls.px_480mw } /></a>
        <div className={ 'title' }>
          <a
            target={ '_blank' }
            href={ formatPattern('/#/:illustId', {
                     illustId: this.props.item.id
                   }) }>
            { this.props.item.title }
          </a>
        </div>
        <div className={ 'meta' }>
          <a
            data-tip={ 'ブックマークに追加' }
            href={ '#' }
            onClick={ this.onFavouriteClick.bind(this) }
            className={ 'count' }><i className={ 'material-icons grade star' }></i> { this.props.item.stats.favorited_count.public + this.props.item.stats.favorited_count.private }</a>
        </div>
      </div>
      );
  }
}
