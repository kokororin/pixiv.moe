import styles from '@/styles/Message.scss';

import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

@CSSModules(styles, { allowMultiple: true })
export default class Message extends React.Component {
  static propTypes = {
    isHidden: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {
    isHidden: false,
    text: 'エラーが発生しました。URLを確認するか、しばらく時間を置いて再度アクセスしてください。'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.isHidden ? null : (
      <div styleName="message">
        <p>{this.props.text}</p>
      </div>
    );
  }
}
