import styles from '@/styles/Illust.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import ListItem from 'react-mdl/lib/List/ListItem';
import ListItemContent from 'react-mdl/lib/List/ListItemContent';
import { EmojiParser } from '@/utils';

const Comment = ({ item }) =>
  <ListItem>
    <ListItemContent
      avatar={
        <img width={40} height={40} src={item.user.profile_image_urls.medium} />
      }>
      {item.user.name}
      <span
        styleName={'comment-content'}
        dangerouslySetInnerHTML={{
          __html: EmojiParser.parse(item.comment)
        }}
      />
    </ListItemContent>
  </ListItem>;

Comment.propTypes = {
  item: PropTypes.object
};

export default CSSModules(Comment, styles, { allowMultiple: true });
