import React from 'react';
import Masonry from 'react-masonry-component';

import Item from '@/components/Item';

interface IListProps {
  items: any[];
}

export default class List extends React.Component<IListProps> {
  masonryRef: any;

  render() {
    return (
      <Masonry
        ref={ref => (this.masonryRef = ref as any)}
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
