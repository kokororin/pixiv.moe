import '../styles/Dialog.scss';

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
    return this.state.isHidden
      ? null
      : (<div className={ 'dialog-container' }>
           <div className={ 'dialog-wrap-1' }>
             <div className={ 'dialog-wrap-2' }>
               <div className={ 'dialog-body' }>
                 { this.state.content }
               </div>
             </div>
           </div>
         </div>);
  }
}