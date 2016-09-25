import '../styles/Login.css';

import React from 'react';

import { Dialog } from '.';
import { Storage } from '../utils';

import config from 'config';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isHidden: true,
      isSubmitting: false,
      authData: null
    };
  }

  componentDidMount() {
    const authData = Storage.get('auth');
    this.setState({
      authData: authData
    });
  }

  renderContent() {

    if (this.state.authData != null && this.state.authData.expires_time > new Date().getTime()) {
      return (<div>
                <div className={ 'avatar' }>
                  <span className={ 'name' }>ニックネーム 「{ this.state.authData.user.name }」</span>
                </div>
                <div className={ 'footer' }>
                  <div
                    className={ 'button raised blue' }
                    onClick={ () => this.onLogoutClick() }>
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
                  onClick={ () => this.onLoginClick() }>
                  <div className={ 'button-inner' }>
                    { this.state.isSubmitting ? 'ちょっとまって' : 'ログイン' }
                  </div>
                </div>
              </div>
            </div>);
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

  onCloseClick(event) {
    event.nativeEvent.preventDefault();
    this.close();
  }

  onOverlayClick(event) {
    if (event.target.id == 'modal-overlay') {
      this.close();
    }
  }

  onLoginClick() {
    if (this.state.isSubmitting) {
      return;
    }

    const username = this.username.value;
    const password = this.password.value;

    if (username == '') {
      return this.dialog.setContent('pixiv ID、またはメールアドレスが未記入です');
    }

    if (password == '') {
      return this.dialog.setContent('パスワードが未記入です');
    }

    this.setState({
      isSubmitting: true
    });

    fetch(config.authURL, {
      mode: 'cors',
      method: 'post',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'text/plain', // eslint-disable-line
      }),
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        if (data.status == 'success') {
          let authData = data.data;
          authData['auth_time'] = new Date().getTime();
          authData['expires_time'] = authData['auth_time'] + authData['expires_in'] * 1000;
          Storage.set('auth', authData);
          this.setState({
            authData: authData
          });
          setTimeout(() => {
            this.close();
            try {
              this.username.value = '';
              this.password.value = '';
            } catch ( e ) {}
          }, 1500);
        } else {
          this.dialog.setContent(data.message);
        }
      })
      .then(() => {
        this.setState({
          isSubmitting: false
        });
      });
  }

  onLogoutClick() {
    Storage.remove('auth');
    this.setState({
      authData: null
    });
  }

  render() {
    return (
      <div>
        <div className={ 'login-modal-container ' + (this.state.isHidden ? 'close' : 'open') }>
          <div id={ 'login-modal' }>
            <a
              className={ 'close' }
              href={ '#' }
              onClick={ this.onCloseClick.bind(this) }>x</a>
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