import React from 'react';
import time from 'locutus/php/datetime/time';

import { Alert, Login } from '../components';
import { Storage } from '../utils';

import config from 'config';

export default class LoginContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      authData: null
    };

    this.onKeydown = this.onKeydown.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  componentDidMount() {
    const authData = Storage.get('auth');
    this.setState({
      authData: authData
    });
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown(event) {
    if (event.keyCode === 27) {
      this.login.close();
    }

    if (this.login.state.isHidden === false && event.keyCode === 13) {
      this.onLoginClick();
    }
  }

  open() {
    this.login.open();
  }

  close() {
    this.login.close();
  }

  onLoginClick() {

    if (this.state.isSubmitting) {
      return;
    }

    const username = this.login.getUsername();
    const password = this.login.getPassword();

    if (username === '') {
      return this.alert.setContent('pixiv ID、またはメールアドレスが未記入です');
    }

    if (password === '') {
      return this.alert.setContent('パスワードが未記入です');
    }

    this.setState({
      isSubmitting: true
    });

    fetch(config.authURL, {
      mode: 'cors',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
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

        if (data.status === 'success') {
          const authData = data.data;
          authData.auth_time = time();
          authData.expires_at = authData.auth_time + authData.expires_in;
          Storage.set('auth', authData);
          this.setState({
            authData: authData
          });
          setTimeout(() => {
            this.close();
            this.login.setUsername('');
            this.login.setPassword('');
          }, 1500);
        } else {
          this.alert.setContent(data.message);
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
        <Login
          ref={ (ref) => this.login = ref }
          onLoginClick={ this.onLoginClick }
          onLogoutClick={ this.onLogoutClick }
          isSubmitting={ this.state.isSubmitting }
          authData={ this.state.authData } />
        <Alert ref={ (ref) => this.alert = ref } />
      </div>
      );
  }
}
