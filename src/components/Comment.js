import styles from '@/styles/Illust.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { ListItem, ListItemContent } from 'react-mdl';

import { EmojiParser } from '@/utils';

@CSSModules(styles, { allowMultiple: true })
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    item: PropTypes.object
  };

  render() {
    return (
      <ListItem>
        <ListItemContent
          avatar={
            <img
              width={40}
              height={40}
              src={this.props.item.user.profile_image_urls.medium}
            />
          }>
          {this.props.item.user.name}
          <span
            styleName={'comment-content'}
            dangerouslySetInnerHTML={{
              __html: EmojiParser.parse(this.props.item.comment)
            }}
          />
        </ListItemContent>
      </ListItem>
    );
  }
}
