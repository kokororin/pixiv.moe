import React from 'react';
import Masonry from 'react-masonry-component';

import Item from '@/components/Item';

interface IListProps {
  items: any[];
}

const List: React.SFC<IListProps> = props => {
  const masonryRef = React.useRef<any>(null);
  return (
    <Masonry
      ref={masonryRef}
      className="masonry"
      style={{ margin: '0 auto' }}
      elementType="div"
      options={{ transitionDuration: 0, fitWidth: true }}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}>
      {props.items.map((elem, index) => {
        return (
          <Item
            key={index}
            index={index}
            item={elem}
            masonry={masonryRef?.current}
          />
        );
      })}
    </Masonry>
  );
};

export default List;
