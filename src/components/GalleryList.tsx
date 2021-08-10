import React from 'react';
import StackGrid from 'react-stack-grid';
import { makeStyles } from '@material-ui/core/styles';

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
  return (
    <StackGrid
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
