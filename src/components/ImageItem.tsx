import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Image from 'material-ui-image';
import StarIcon from '@material-ui/icons/Star';
import * as api from '@/utils/api';

const useStyles = makeStyles({
  cell: {
    width: 175,
    minHeight: 100,
    padding: 0,
    background: '#fff',
    margin: 8,
    marginTop: 10,
    fontSize: 12,
    boxShadow:
      '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    textAlign: 'center',
    '&:hover': {
      boxShadow: '0 1px 5px rgba(34, 25, 25, 0.8)'
    },
    '@media screen and (max-width: 400px)': {
      width: 160
    },
    '@media screen and (max-width: 320px)': {
      width: 140
    }
  },
  link: {
    textDecoration: 'none'
  },
  imageWrapper: {
    overflow: 'hidden',
    '& img': {
      display: 'block',
      width: '100%',
      height: '100%',
      border: 0,
      maxWidth: '100%',
      background: '#ccc',
      transition: 'opacity 0.5s ease, transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    }
  },
  title: {
    margin: '1px 0',
    fontSize: 16,
    lineHeight: 1,
    '& span': {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000',
      textDecoration: 'none'
    }
  },
  meta: {
    lineHeight: 1,
    padding: '0 0 7px',
    margin: '8px 0',
    fontSize: 10,
    '& span': {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000',
      textDecoration: 'none'
    },
    '& svg': {
      fontSize: 20
    }
  },
  count: {
    color: '#0069b1 !important',
    backgroundColor: '#cceeff',
    borderRadius: 3,
    margin: '0 1px',
    padding: '0 6px',
    '& svg': {
      verticalAlign: 'middle',
      position: 'relative',
      top: '-.1em',
      fontSize: 14
    }
  },
  rankNum: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16
  },
  rankTextOuter: {
    color: '#757575',
    verticalAlign: 1,
    marginLeft: 3
  },
  noPreviousRank: {
    color: '#f44336'
  }
});

interface IImageItemProps {
  item: any;
  index: number;
}

const ImageItem: React.FC<IImageItemProps> = props => {
  const classes = useStyles();

  const onImageMouseMove = (event: React.MouseEvent) => {
    const nativeEvent = event.nativeEvent;
    const target = event.target as HTMLElement;
    if (target.tagName.toLowerCase() === 'img') {
      target.style.transformOrigin = `${nativeEvent.offsetX}px ${nativeEvent.offsetY}px`;
    }
  };

  return (
    <div className={classes.cell} onMouseMove={onImageMouseMove}>
      <Link className={classes.link} to={`/illust/${props.item.id}`}>
        <div className={classes.imageWrapper}>
          <Image
            aspectRatio={props.item.width / props.item.height}
            src={api.proxyImage(props.item.image_urls.medium)}
          />
        </div>
        <div className={classes.title}>
          <span>{props.item.title}</span>
        </div>

        <div className={classes.meta}>
          <span className={classes.count}>
            <StarIcon />
            {props.item.total_bookmarks}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ImageItem;
