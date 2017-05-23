import React from 'react';
import time from 'locutus/php/datetime/time';

import { Alert, Login } from '@/components';
import { cachedFetch, Storage } from '@/utils';

import config from '@/config';

@autobind
export default class LoginContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      authData: null
    };
  }

  componentDidMount() {
    const authData = Storage.get('auth');
    this.setState({
      authData
    });
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown(event) {
    if (event.keyCode === 27) {
      this.loginRef.close();
    }

    if (this.loginRef.state.isHidden === false && event.keyCode === 13) {
      this.onLoginClick();
    }
  }

  open() {
    this.loginRef.open();
  }

  close() {
    this.loginRef.close();
  }

  onLoginClick() {

    if (this.state.isSubmitting) {
      return;
    }

    if (!Storage.isSupport()) {
      return this.alertRef.setContent('localStorageをサポートしていないブラウザ');
    }

    const username = this.loginRef.getUsername();
    const password = this.loginRef.getPassword();

    if (username === '') {
      return this.alertRef.setContent('pixiv ID、またはメールアドレスが未記入です');
    }

    if (password === '') {
      return this.alertRef.setContent('パスワードが未記入です');
    }

    this.setState({
      isSubmitting: true
    });

    cachedFetch(`${config.apiBaseURL}${config.authURI}`, {
      mode: 'cors',
      method: 'post',
      timeout: 10e3,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then((data) => {

        if (data.status === 'success') {
          const authData = data.data;
          authData.auth_time = time();
          authData.expires_at = authData.auth_time + authData.expires_in;
          Storage.set('auth', authData);
          this.setState({
            authData
          });
          setTimeout(() => {
            this.close();
            this.loginRef.setUsername('');
            this.loginRef.setPassword('');
          }, 1500);
        } else {
          this.alertRef.setContent(data.message);
        }
      })
      .then(() => {
        this.setState({
          isSubmitting: false
        });
      })
      .catch(() => {
        this.setState({
          isSubmitting: false
        });
        // text from SIF
        this.alertRef.setContent('通信エラーが発生しました');
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
        <Login
          ref={ (ref) => this.loginRef = ref }
          onLoginClick={ this.onLoginClick }
          onLogoutClick={ this.onLogoutClick }
          isSubmitting={ this.state.isSubmitting }
          authData={ this.state.authData } />
        <Alert ref={ (ref) => this.alertRef = ref } />
      </div>
    );
  }
}
