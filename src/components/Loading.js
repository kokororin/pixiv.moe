import '../styles/Base.css';

import React from 'react';

class LoadingComponent extends React.Component {

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
      <div className={ 'message ' + (this.state.isHidden ? 'hide' : 'show') }>
        <img src={ require('../images/loading.gif') } />
        <p>
          データが记载する中
        </p>
      </div>
      );
  }
}

export default LoadingComponent;