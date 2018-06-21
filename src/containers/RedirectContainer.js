import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import Message from '@/components/Message';

@injectIntl
export default class RedirectContainer extends React.Component {
  static propTypes = {
    illustId: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isError: false
    };
  }

  componentDidMount() {
    const illustId = this.props.match.params.illustId;
    if (!isNaN(parseFloat(illustId)) && isFinite(illustId)) {
      this.setState({
        isError: false
      });
      new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
        window.location.href = `http://www.pixiv.net/member_illust.php?mode=medium&illust_id=${illustId}`;
      });
    } else {
      this.setState({
        isError: true
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.isError ? (
          <Message />
        ) : (
          <Message
            text={this.props.intl.formatMessage({
              id: 'Redirecting to pixiv.net'
            })}
          />
        )}
      </div>
    );
  }
}
