import '../styles/Base.css';

import React from 'react';

class MessageComponent extends React.Component {

  static propTypes = {
    text: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ 'message' }>
        <p>
          { typeof this.props.text === 'undefined' ? 'エラーが発生しました。URLを確認するか、しばらく時間を置いて再度アクセスしてください。' : this.props.text }
        </p>
      </div>
      );
  }
}

export default MessageComponent;