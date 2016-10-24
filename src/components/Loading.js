import '../styles/Message.scss';

import React from 'react';
import { Spinner } from 'react-mdl';

export default class Loading extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
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
    return this.state.isHidden
      ? null
      : (
      <div className={ 'message' }>
        <Spinner/>
        <p>
          データが记载する中
        </p>
      </div>
      );
  }
}
