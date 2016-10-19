import '../styles/Login.scss';

import React from 'react';
import { Button, Textfield, Icon } from 'react-mdl';
import classNames from 'classnames';
import 'classlist-polyfill';

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
      hasOpened: false,
      username: '',
      password: ''
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

  setUsername(username) {
    this.setState({
      username: username
    });
  }

  getUsername() {
    return this.state.username;
  }

  setPassword(password) {
    this.setState({
      password: password
    });
  }

  getPassword() {
    return this.state.password;
  }

  renderContent() {

    if (this.props.authData != null && this.props.authData.expires_time > new Date().getTime()) {
      return (<div>
                <div className={ 'avatar' }>
                  <span className={ 'name' }>ニックネーム 「{ this.props.authData.user.name }」</span>
                </div>
                <div className={ 'footer' }>
                  <Button
                    onClick={ this.props.onLogoutClick.bind(this) }
                    raised
                    accent
                    ripple>
                    ログアウト
                  </Button>
                </div>
              </div>);
    }
    return (<div>
              <Textfield
                onChange={ (event) => this.setUsername(event.target.value) }
                value={ this.getUsername() }
                label={ 'メールアドレス / pixiv ID' }
                floatingLabel
                style={ { width: '100%' } } />
              <Textfield
                type={ 'password' }
                onChange={ (event) => this.setPassword(event.target.value) }
                value={ this.getPassword() }
                label={ 'パスワード' }
                floatingLabel
                style={ { width: '100%' } } />
              <div className={ 'footer' }>
                <Button
                  onClick={ this.props.onLoginClick.bind(this) }
                  raised
                  accent
                  ripple>
                  { this.props.isSubmitting ? 'ちょっとまって' : 'ログイン' }
                </Button>
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
              <Icon name={ 'clear' } />
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
      </div>
      );
  }
}