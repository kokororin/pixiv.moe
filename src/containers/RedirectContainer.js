import React from 'react';

import { Message } from '../components';

export default class RedirectContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isError: false
    };
  }

  componentDidMount() {
    const illustId = this.props.params.illustId;
    if (!isNaN(parseFloat(illustId)) && isFinite(illustId)) {
      this.setState({
        isError: false
      });
      setTimeout(() => {
        window.location.href = `http://www.pixiv.net/member_illust.php?mode=medium&illust_id=${this.props.params.illustId}`;
      }, 1500);
    } else {
      this.setState({
        isError: true
      });
    }

  }

  render() {
    return (
      <div>
        { this.state.isError ?
          <Message /> :
          <Message text={ 'あなたはpixiv.netへリダイレクトしています' } /> }
      </div>
      );
  }
}