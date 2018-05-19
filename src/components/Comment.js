import styles from '@/styles/Illust.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Img from 'react-image';
import ListItem from 'react-mdl/lib/List/ListItem';
import ListItemContent from 'react-mdl/lib/List/ListItemContent';
import { EmojiParser } from '@/utils';

const Comment = ({ item }) => {
  for (const badWord of Comment.badWords) {
    if (
      typeof item.comment === 'string' &&
      item.comment.toLowerCase().indexOf(badWord.toLowerCase()) > -1
    ) {
      return null;
    }
  }

  return (
    <ListItem>
      <ListItemContent
        avatar={
          <div>
            <Img
              src={[item.user.profile_image_urls.medium]}
              loader={
                <img src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" />
              }
            />
          </div>
        }>
        {item.user.name}
        <span
          styleName="comment-content"
          dangerouslySetInnerHTML={{
            __html: EmojiParser.parse(item.comment)
          }}
        />
      </ListItemContent>
    </ListItem>
  );
};

Comment.badWords = [
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

Comment.propTypes = {
  item: PropTypes.object
};

export default CSSModules(Comment, styles, { allowMultiple: true });
