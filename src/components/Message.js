import styles from '@/styles/Message.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { FormattedMessage } from 'react-intl';

@CSSModules(styles)
export default class Message extends React.Component {
  static propTypes = {
    isHidden: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {
    isHidden: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.isHidden ? null : (
      <div styleName="message">
        <p>
          {this.props.text ? (
            this.props.text
          ) : (
            <FormattedMessage id="An error occurred. Check the URL or wait for a while and access again." />
          )}
        </p>
      </div>
    );
  }
}
