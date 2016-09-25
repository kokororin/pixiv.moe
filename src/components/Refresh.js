import '../styles/Base.css';
import '../styles/Button.css';
import '../styles/MaterialIcons.css';

import React from 'react';

export default class Refresh extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      isRefreshIconHidden: false,
      isRefreshSpinnerHidden: true
    };
  }

  animate(flag) {
    flag ? this.setState({
      isRefreshIconHidden: true,
      isRefreshSpinnerHidden: false
    }) : this.setState({
      isRefreshIconHidden: false,
      isRefreshSpinnerHidden: true
    });
  }

  render() {
    return (
      <div
           id={ 'refresh' }
           className={ 'float-btn' }
           onClick={ this.props.onClick.bind(this) }>
        <i className={ 'material-icons refresh ' + (this.state.isRefreshIconHidden ? 'hide' : 'show') }></i>
        <div className={ 'loading-spinner ' + (this.state.isRefreshSpinnerHidden ? 'hide' : 'show') }></div>
      </div>
      );
  }
}