import '../styles/Base.scss';
import '../styles/Button.scss';
import '../styles/MaterialIcons.scss';

import React from 'react';

export default class Account extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div
        id={ 'account' }
        className={ 'float-btn' }
        onClick={ this.props.onClick.bind(this) }>
        <i className={ 'material-icons favorite' }></i>
      </div>
      );
  }
}