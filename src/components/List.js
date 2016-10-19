import React from 'react';
import Masonry from 'react-masonry-component';

import { Item } from '.';


export default class List extends React.Component {

  static propTypes = {
    items: React.PropTypes.array,
    onImageClick: React.PropTypes.func,
    onFavouriteClick: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Masonry
        ref={ (ref) => this.masonry = ref }
        className={ 'masonry' }
        elementType={ 'div' }
        options={ { transitionDuration: 0 } }
        disableImagesLoaded={ false }
        updateOnEachImageLoad={ false }>
        { this.props.items.map((elem, index) => {
            return <Item
                     key={ elem.unique_id }
                     item={ elem }
                     onImageClick={ this.props.onImageClick.bind(this, index) }
                     onFavouriteClick={ this.props.onFavouriteClick.bind(this, elem.id) }
                     onImageLoad={ this.masonry.performLayout } />
          }) }
      </Masonry>
      );
  }
}
