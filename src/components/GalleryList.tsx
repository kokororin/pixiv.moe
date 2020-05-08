import React from 'react';
import { MasonryScroller, usePositioner, useContainerPosition } from 'masonic';
import { useWindowSize } from '@react-hook/window-size';

import ImageItem from '@/components/ImageItem';

interface IGalleryListProps {
  items: any[];
}

const GalleryList: React.FunctionComponent<IGalleryListProps> = props => {
  const containerRef = React.useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight
  ]);
  const positioner = usePositioner({ width, columnWidth: 175 });

  return (
    <MasonryScroller
      positioner={positioner}
      offset={offset}
      height={windowHeight}
      containerRef={containerRef}
      items={props.items}
      overscanBy={6}
      render={({ index, data }) => (
        <ImageItem key={index} index={index} item={data} />
      )}
    />
  );
};

export default GalleryList;
