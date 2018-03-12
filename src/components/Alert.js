import styles from '@/styles/Alert.scss';

import React from 'react';
import CSSModules from 'react-css-modules';
import Modal from 'react-modal';

@CSSModules(styles, { allowMultiple: true })
export default class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      content: ''
    };

    Modal.setAppElement('#app');
  }

  @autobind
  setContent(content) {
    if (!this.state.isHidden) {
      this.setState({
        isHidden: true
      });
    }

    this.setState({
      isHidden: false,
      content
    });

    setTimeout(() => {
      this.setState({
        isHidden: true
      });
    }, 3500);
  }

  render() {
    return (
      <Modal
        styleName="alert-container"
        overlayClassName={styles['alert-modal-overlay']}
        isOpen={!this.state.isHidden}
        contentLabel="alert-modal">
        <div styleName="alert-wrap-1">
          <div styleName="alert-wrap-2">
            <div styleName="alert-body">{this.state.content}</div>
          </div>
        </div>
      </Modal>
    );
  }
}
