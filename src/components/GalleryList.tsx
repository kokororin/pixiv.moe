import React from 'react';
import StackGrid from 'react-stack-grid';

import ImageItem from '@/components/ImageItem';

interface IGalleryListProps {
  items: any[];
}

const GalleryList: React.FC<IGalleryListProps> = props => {
  return (
    <StackGrid
      className="stack-grid"
      style={{ margin: '0 auto', width: '95%' }}
      columnWidth={180}
      gutterWidth={10}
      component="div"
      itemComponent="div"
      vendorPrefix
      monitorImagesLoaded>
      {props.items.map((elem, index) => {
        return <ImageItem key={index} index={index} item={elem} />;
      })}
    </StackGrid>
  );
};

export default GalleryList;
