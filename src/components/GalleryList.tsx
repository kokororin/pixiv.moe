import React from 'react';
import Masonry from 'react-masonry-component';

import ImageItem from '@/components/ImageItem';

interface IGalleryListProps {
  items: any[];
}

const GalleryList: React.FunctionComponent<IGalleryListProps> = props => {
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
          <ImageItem
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

export default GalleryList;
