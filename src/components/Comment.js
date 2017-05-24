import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemContent } from 'react-mdl';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    item: PropTypes.object
  };

  render() {
    return (
      <ListItem twoLine>
        <ListItemContent
          avatar={ <img src={ this.props.item.user.profile_image_urls.medium } /> }
          subtitle={ this.props.item.comment }>
          { this.props.item.user.name }
        </ListItemContent>
      </ListItem>
    );
  }
}
