import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import Item from '@/components/Item';

export default class List extends React.Component {
  static propTypes = {
    items: PropTypes.array
  };

  render() {
    return (
      <Masonry
        ref={ref => (this.masonryRef = ref)}
        className="masonry"
        style={{ margin: '0 auto' }}
        elementType="div"
        options={{ transitionDuration: 0, fitWidth: true }}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}>
        {this.props.items.map((elem, index) => {
          return (
            <Item
              key={index}
              index={index}
              item={elem}
              masonry={this.masonryRef}
            />
          );
        })}
      </Masonry>
    );
  }
}
