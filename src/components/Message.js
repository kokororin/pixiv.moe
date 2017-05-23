import '@/styles/Message.scss';

import React from 'react';
import PropTypes from 'prop-types';

@autobind
export default class Message extends React.Component {

  static defaultProps = {
    isHidden: false,
    text: 'エラーが発生しました。URLを確認するか、しばらく時間を置いて再度アクセスしてください。'
  };

  static propTypes = {
    isHidden: PropTypes.bool,
    text: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  show() {
    this.setState({
      isHidden: false
    });
  }

  hide() {
    this.setState({
      isHidden: true
    });
  }

  render() {
    return this.props.isHidden
      ? null
      : (
      <div className={ 'message' }>
        <p>
          { this.props.text }
        </p>
      </div>
      );
  }
}
