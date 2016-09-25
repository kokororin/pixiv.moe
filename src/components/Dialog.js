import '../styles/Dialog.css';

import React from 'react';

export default class Dialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      content: ''
    };
  }

  setContent(content) {
    if (!this.state.isHidden) {
      this.setState({
        isHidden: true
      });
    }

    this.setState({
      isHidden: false,
      content: content
    });

    setTimeout(() => {
      this.setState({
        isHidden: true
      });
    }, 3500);
  }

  render() {
    return (
      <div className={ 'dialog-container ' + (this.state.isHidden ? 'close' : 'open') }>
        <div className={ 'dialog-wrap-1' }>
          <div className={ 'dialog-wrap-2' }>
            <div className={ 'dialog-body' }>
              { this.state.content }
            </div>
          </div>
        </div>
      </div>
      );
  }
}