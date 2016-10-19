import '../styles/Button.scss';

import React from 'react';
import { FABButton, Icon } from 'react-mdl';

export default class Account extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className={ 'float-btn account' }>
        <FABButton
          onClick={ this.props.onClick.bind(this) }
          colored
          ripple>
          <Icon name={ 'favorite' } />
        </FABButton>
      </div>

      );
  }
}