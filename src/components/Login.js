import '../styles/Login.scss';
import '../styles/Fn.scss';

import React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import time from 'locutus/php/datetime/time';
import { Button, Textfield, Icon } from 'react-mdl';

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
      username: '',
      password: ''
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.afterOpen = this.afterOpen.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.getPassword = this.getPassword.bind(this);
  }

  componentDidMount() {
    const authData = Storage.get('auth');
    this.setState({
      authData: authData
    });
  }

  open() {
    this.setState({
      isHidden: false
    });
  }


  close() {
    this.setState({
      isHidden: true
    });
  }

  afterOpen() {
    document.querySelector('.login-modal-overlay').addEventListener('click', this.onOverlayClick);
  }

  onOverlayClick(event) {
    if (event.target.classList.contains('ReactModal__Content')) {
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

  modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      zIndex: 1000
    },
    content: {
      backgroundColor: 'transparent',
      overflow: 'hidden',
      border: 'none',
      borderRadius: 0,
      padding: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  };

  renderContent() {

    if (this.props.authData !== null && this.props.authData.expires_at > time()) {
      return (<div>
                <div className={ 'avatar' }>
                  <span className={ 'name' }>ニックネーム 「{ this.props.authData.user.name }」</span>
                </div>
                <div className={ 'footer' }>
                  <Button
                    onClick={ this.props.onLogoutClick }
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
                spellCheck={ false }
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
                  className={ classNames({
                                'fn-disallow': this.props.isSubmitting
                              }) }
                  onClick={ this.props.onLoginClick }
                  disabled={ this.props.isSubmitting }
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
      <Modal
        isOpen={ !this.state.isHidden }
        onRequestClose={ this.close }
        onAfterOpen={ this.afterOpen }
        overlayClassName={ 'login-modal-overlay' }
        shouldCloseOnOverlayClick={ false }
        style={ this.modalStyle }
        contentLabel={ 'login-modal' }>
        <div id={ 'login-modal-root' }>
          <div className={ 'login-modal-container' }>
            <div className={ 'login-modal-body' }>
              <div
                className={ 'clear' }
                onClick={ this.close }>
                <Icon name={ 'clear' } />
              </div>
              <div className={ 'form' }>
                <div className={ 'fields' }>
                  { this.renderContent() }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      );
  }
}
