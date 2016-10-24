import '../styles/Alert.scss';

import React from 'react';

import { RenderInBody } from '.';

export default class Alert extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      content: ''
    };

    this.setContent = this.setContent.bind(this);
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
      : (
      <RenderInBody>
        <div className={ 'alert-container' }>
          <div className={ 'alert-wrap-1' }>
            <div className={ 'alert-wrap-2' }>
              <div className={ 'alert-body' }>
                { this.state.content }
              </div>
            </div>
          </div>
        </div>
      </RenderInBody>
      );
  }
}
