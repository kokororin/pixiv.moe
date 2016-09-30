import '../styles/Login.scss';
import '../styles/MaterialIcons.scss';

import React from 'react';

import { Login } from '../components';
import { Storage } from '../utils';

import config from 'config';

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
      authData: authData
    });
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

    const username = this.login.username.value;
    const password = this.login.password.value;

    if (username == '') {
      return this.login.dialog.setContent('pixiv ID、またはメールアドレスが未記入です');
    }

    if (password == '') {
      return this.login.dialog.setContent('パスワードが未記入です');
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
          const authData = data.data;
          authData['auth_time'] = new Date().getTime();
          authData['expires_time'] = authData['auth_time'] + authData['expires_in'] * 1000;
          Storage.set('auth', authData);
          this.setState({
            authData: authData
          });
          setTimeout(() => {
            this.close();
            try {
              this.login.username.value = '';
              this.login.password.value = '';
            } catch ( e ) {}
          }, 1500);
        } else {
          this.login.dialog.setContent(data.message);
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
      <Login
        ref={ (ref) => this.login = ref }
        onLoginClick={ this.onLoginClick.bind(this) }
        onLogoutClick={ this.onLogoutClick.bind(this) }
        isSubmitting={ this.state.isSubmitting }
        authData={ this.state.authData } />
      );
  }
}