import '../styles/Base.scss';
import '../styles/Loader.scss';

import React from 'react';

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
    return this.state.isHidden
      ? null
      : (
      <div className={ 'message' }>
        <div className={ 'md-loader' }>
          <svg
            xmlns={ 'http://www.w3.org/2000/svg' }
            version={ 1.1 }
            height={ 35 }
            width={ 35 }
            viewBox={ '0 0 75 75' }>
            <circle
              cx={ 37.5 }
              cy={ 37.5 }
              r={ 33.5 }
              strokeWidth={ 8 } />
          </svg>
        </div>
        <p>
          データが记载する中
        </p>
      </div>
      );
  }
}