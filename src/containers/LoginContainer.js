import React from 'react';

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
  }

  componentDidMount() {
    const authData = Storage.get('auth');
    this.setState({
      authData: authData
    });
    document.addEventListener('keydown', this.onKeydown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown.bind(this));
  }

  onKeydown(event) {
    if (event.keyCode == 27) {
      this.login.close();
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

    if (username == '') {
      return this.alert.setContent('pixiv ID、またはメールアドレスが未記入です');
    }

    if (password == '') {
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
              this.login.setUsername('');
              this.login.setPassword('');
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
        <Login
          ref={ (ref) => this.login = ref }
          onLoginClick={ this.onLoginClick.bind(this) }
          onLogoutClick={ this.onLogoutClick.bind(this) }
          isSubmitting={ this.state.isSubmitting }
          authData={ this.state.authData } />
        <Alert ref={ (ref) => this.alert = ref } />
      </div>
      );
  }
}