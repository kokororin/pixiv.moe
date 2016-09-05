import '../styles/Item.css';

import React from 'react';

import config from 'config';

class ItemComponent extends React.Component {

  static propTypes = {
    item: React.PropTypes.object,
    onClick: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={ 'cell' }>
        <a
           href={ 'javascipt:;' }
           onClick={ this.props.onClick }><img src={ this.props.item.image_urls.px_480mw } /></a>
        <p className={ 'title' }>
          <a
             target={ '_blank' }
             href={ config.baseURL + this.props.item.id }>
            { this.props.item.title }
          </a>
        </p>
        <p className={ 'meta' }>
          { this.props.item.stats.favorited_count.public + this.props.item.stats.favorited_count.private + '件のブックマーク' }
        </p>
      </div>
      );
  }
}

export default ItemComponent;