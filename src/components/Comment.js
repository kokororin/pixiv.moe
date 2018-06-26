import styles from '@/styles/Illust.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Img from 'react-image';
import EmojiParser from '@/utils/EmojiParser';

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
    <li styleName="comment-list-item">
      <span styleName="comment-main">
        <div styleName="comment-avatar">
          <Img
            src={[item.user.profile_image_urls.medium]}
            loader={
              <img src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=" />
            }
          />
        </div>
        <span>
          {item.user.name}
          <span
            styleName="comment-content"
            dangerouslySetInnerHTML={{
              __html: EmojiParser.parse(item.comment)
            }}
          />
        </span>
      </span>
    </li>
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

// eslint-disable-next-line babel/new-cap
export default CSSModules(Comment, styles, { allowMultiple: true });
