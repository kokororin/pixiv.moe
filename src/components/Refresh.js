import '../styles/Base.scss';
import '../styles/Button.scss';
import '../styles/MaterialIcons.scss';

import React from 'react';
import classNames from 'classnames';

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
        <i className={ classNames({
                         'material-icons': true,
                         'refresh': true,
                         'show': !this.state.isRefreshIconHidden,
                         'hide': this.state.isRefreshIconHidden
                       }) }></i>
        <div className={ classNames({
                           'loading-spinner': true,
                           'show': !this.state.isRefreshSpinnerHidden,
                           'hide': this.state.isRefreshSpinnerHidden
                         }) }></div>
      </div>
      );
  }
}