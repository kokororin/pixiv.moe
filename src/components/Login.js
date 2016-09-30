import '../styles/Login.scss';
import '../styles/MaterialIcons.scss';

import React from 'react';
import classNames from 'classnames';
import 'classlist-polyfill';

import { Dialog } from '.';
import { Storage } from '../utils';

export default class Login extends React.Component {

  static propTypes = {
    onLogoutClick: React.PropTypes.func,
    onLogoutClick: React.PropTypes.func,
    isSubmitting: React.PropTypes.bool,
    authData: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isClosing: false,
      hasOpened: false
    };
  }

  componentDidMount() {
    const authData = Storage.get('auth');
    this.setState({
      authData: authData
    });
  }

  open() {
    this.setState({
      hasOpened: true,
      isHidden: false
    });
    document.body.classList.add('login-modal-open');
  }


  close() {
    this.setState({
      isHidden: true
    });
    document.body.classList.remove('login-modal-open');
  }

  onOverlayClick(event) {
    if (event.target.id == 'modal-overlay') {
      this.close();
    }
  }

  renderContent() {

    if (this.props.authData != null && this.props.authData.expires_time > new Date().getTime()) {
      return (<div>
                <div className={ 'avatar' }>
                  <span className={ 'name' }>ニックネーム 「{ this.props.authData.user.name }」</span>
                </div>
                <div className={ 'footer' }>
                  <div
                    className={ 'button raised blue' }
                    onClick={ this.props.onLogoutClick.bind(this) }>
                    <div className={ 'button-inner' }>
                      ログアウト
                    </div>
                  </div>
                </div>
              </div>);
    }
    return (<div>
              <div className={ 'field' }>
                <input
                  ref={ (ref) => this.username = ref }
                  type={ 'text' }
                  className={ 'input' }
                  placeholder={ 'メールアドレス / pixiv ID' } />
              </div>
              <div className={ 'field' }>
                <input
                  ref={ (ref) => this.password = ref }
                  type={ 'password' }
                  className={ 'input' }
                  placeholder={ 'パスワード' } />
              </div>
              <div className={ 'footer' }>
                <div
                  className={ 'button raised blue' }
                  onClick={ this.props.onLoginClick.bind(this) }>
                  <div className={ 'button-inner' }>
                    { this.props.isSubmitting ? 'ちょっとまって' : 'ログイン' }
                  </div>
                </div>
              </div>
            </div>);
  }

  render() {
    return (
      <div id={ 'login-modal-root' }>
        <div className={ classNames({
                           'login-modal-container': true,
                           'open': !this.state.isHidden,
                           'close': this.state.isHidden,
                           'init': !this.state.hasOpened
                         }) }>
          <div className={ 'login-modal-body' }>
            <div
              className={ 'clear' }
              onClick={ this.close.bind(this) }>
              <i className={ 'material-icons clear' }></i>
            </div>
            <div className={ 'form' }>
              <div className={ 'fields' }>
                { this.renderContent() }
              </div>
            </div>
          </div>
          <div
            id={ 'modal-overlay' }
            onClick={ this.onOverlayClick.bind(this) }></div>
        </div>
        <Dialog ref={ (ref) => this.dialog = ref } />
      </div>
      );
  }
}