import '../styles/Alert.scss';

import React from 'react';
import Modal from 'react-modal';

export default class Alert extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      content: ''
    };
  }

  setContent = (content) => {
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
  };

  render() {
    return (
      <Modal
        className={ 'alert-container' }
        overlayClassName={ 'alert-modal-overlay' }
        isOpen={ !this.state.isHidden }
        contentLabel={ 'alert-modal' }>
        <div className={ 'alert-wrap-1' }>
          <div className={ 'alert-wrap-2' }>
            <div className={ 'alert-body' }>
              { this.state.content }
            </div>
          </div>
        </div>
      </Modal>
      );
  }
}
