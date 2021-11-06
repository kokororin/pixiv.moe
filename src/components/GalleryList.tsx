import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import StackGrid from 'react-stack-grid';
import makeStyles from '@mui/styles/makeStyles';

import ImageItem from '../components/ImageItem';

const useStyles = makeStyles({
  stackGrid: {
    margin: '0 auto',
    '@media screen and (min-width: 380px)': {
      width: '95%'
    }
  }
});

interface GalleryListProps {
  items: any[];
}

const GalleryList: React.FC<GalleryListProps> = props => {
  const classes = useStyles();
  const gridRef = useRef<StackGrid>(null);

  useEffect(() => {
    if (props.items.length === 0) {
      // eslint-disable-next-line react/no-find-dom-node
      const node = ReactDOM.findDOMNode(gridRef.current) as HTMLDivElement;
      node.style.height = '';
    }
  }, [props.items]);

  return (
    <StackGrid
      ref={gridRef}
      className={classes.stackGrid}
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
