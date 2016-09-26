import '../styles/Base.scss';

import React from 'react';
import classNames from 'classnames';

export default class Message extends React.Component {

  static defaultProps = {
    isHidden: false,
    text: 'エラーが発生しました。URLを確認するか、しばらく時間を置いて再度アクセスしてください。'
  };

  static propTypes = {
    isHidden: React.PropTypes.bool,
    text: React.PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isHidden: this.props.isHidden
    };
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
    return (
      <div className={ classNames({
                   'message': true,
                   'show': !this.state.isHidden,
                   'hide': this.state.isHidden
                 }) }>
        <p>
          { this.props.text }
        </p>
      </div>
      );
  }
}