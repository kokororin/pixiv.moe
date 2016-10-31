import '../styles/Message.scss';

import React from 'react';
import { Spinner } from 'react-mdl';

export default class Loading extends React.Component {

  static defaultProps = {
    isHidden: true
  };

  static propTypes = {
    isHidden: React.PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.isHidden ? this.hide() : this.show();
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
    // it means ローディング
    return this.state.isHidden
      ? null
      : (
      <div className={ 'message' }>
        <Spinner/>
      </div>
      );
  }
}
