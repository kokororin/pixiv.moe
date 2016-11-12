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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isHidden: nextProps.isHidden
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
