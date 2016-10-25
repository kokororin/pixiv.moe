import React from 'react';

import { Message } from '../components';

export default class RedirectContainer extends React.Component {

  static propTypes = {
    illustId: React.PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isError: false
    };
  }

  componentDidMount() {
    const illustId = this.props.illustId;
    if (!isNaN(parseFloat(illustId)) && isFinite(illustId)) {
      this.setState({
        isError: false
      });
      new Promise((resolve) => setTimeout(resolve, 1500))
        .then(() => {
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
        { this.state.isError ?
          <Message /> :
          <Message text={ 'あなたはpixiv.netへリダイレクトしています' } /> }
      </div>
      );
  }
}
