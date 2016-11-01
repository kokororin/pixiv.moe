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

    this.open = ::this.open;
    this.close = ::this.close;
    this.setUsername = ::this.setUsername;
    this.getUsername = ::this.getUsername;
    this.setPassword = ::this.setPassword;
    this.getPassword = ::this.getPassword;
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
        className={ 'login-modal-body' }
        overlayClassName={ 'login-modal-overlay' }
        isOpen={ !this.state.isHidden }
        onRequestClose={ this.close }
        contentLabel={ 'login-modal' }>
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
      </Modal>
      );
  }
}
