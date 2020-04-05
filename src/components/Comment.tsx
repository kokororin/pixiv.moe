import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'react-image';
import EmojiParser from '@/utils/EmojiParser';
import getProxyImage from '@/utils/getProxyImage';

const useStyles = makeStyles({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.04em',
    minHeight: 48,
    boxSizing: 'border-box',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 16,
    color: 'rgba(0, 0, 0, 0.87)',
    overflow: 'hidden'
  },
  main: {
    order: 0,
    flexGrow: 2,
    textDecoration: 'none',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 16,
    height: 40,
    width: 40,
    boxSizing: 'border-box',
    borderRadius: '50%',
    fontSize: 40,
    color: 'white',
    '& img': {
      borderRadius: '50%',
      width: 40,
      height: 40
    }
  },
  content: {
    fontSize: 13,
    fontWeight: 400,
    letterSpacing: 0,
    lineHeight: '18px',
    color: 'rgba(0, 0, 0, 0.54)',
    display: 'block',
    '& img': {
      display: 'inline-block',
      width: 28
    }
  }
});

interface ICommentProps {
  item: any;
}

const Comment: React.SFC<ICommentProps> = ({ item }) => {
  const classes = useStyles();
  const badWords = [
    '墙',
    'VPN',
    '登上了',
    'http',
    'hosts',
    '科学上网',
    '撕逼',
    '好酸',
    '醋意',
    'P站'
  ];
  for (const badWord of badWords) {
    if (
      typeof item.comment === 'string' &&
      item.comment.toLowerCase().indexOf(badWord.toLowerCase()) > -1
    ) {
      return null;
    }
  }

  return (
    <li className={classes.listItem}>
      <span className={classes.main}>
        <div className={classes.avatar}>
          <Img
            src={[getProxyImage(item.user.profile_image_urls.medium)]}
            loader={
              <img src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" />
            }
          />
        </div>
        <span>
          {item.user.name}
          <span
            className={classes.content}
            dangerouslySetInnerHTML={{
              __html: EmojiParser.parse(item.comment)
            }}
          />
        </span>
      </span>
    </li>
  );
};

export default Comment;
