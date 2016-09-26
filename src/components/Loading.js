import '../styles/Base.scss';

import React from 'react';
import classNames from 'classnames';

export default class Loading extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true
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
        <img src={ require('../images/loading.gif') } />
        <p>
          データが记载する中
        </p>
      </div>
      );
  }
}