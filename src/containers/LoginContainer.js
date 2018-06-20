import React from 'react';
import { injectIntl } from 'react-intl';

import Alert from '@/components/Alert';
import Login from '@/components/Login';
import cachedFetch from '@/utils/cachedFetch';
import moment from '@/utils/moment';
import Storage from '@/utils/Storage';
import withRef from '@/utils/withRef';

import config from '@/config';

class LoginContainer extends React.Component {
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

  @autobind
  onKeydown(event) {
    if (event.keyCode === 27) {
      this.loginRef.getRef().close();
    }

    if (
      this.loginRef.getRef().state.isHidden === false &&
      event.keyCode === 13
    ) {
      this.onLoginClick();
    }
  }

  @autobind
  open() {
    this.loginRef.getRef().open();
  }

  @autobind
  close() {
    this.loginRef.getRef().close();
  }

  @autobind
  onLoginClick() {
    if (this.state.isSubmitting) {
      return;
    }

    if (!Storage.isSupport()) {
      return this.alertRef.setContent(
        this.props.intl.formatMessage({
          id: 'Web Browser does not support localStorage'
        })
      );
    }

    const username = this.loginRef.getRef().getUsername();
    const password = this.loginRef.getRef().getPassword();

    if (username === '') {
      return this.alertRef.setContent(
        this.props.intl.formatMessage({
          id: 'pixiv ID or Email Address is Blank'
        })
      );
    }

    if (password === '') {
      return this.alertRef.setContent(
        this.props.intl.formatMessage({ id: 'Password is Blank' })
      );
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
      .then(data => {
        if (data.status === 'success') {
          const authData = data.data;
          authData.auth_time = moment().unix();
          authData.expires_at = authData.auth_time + authData.expires_in;
          Storage.set('auth', authData);
          this.setState({
            authData
          });
          setTimeout(() => {
            this.close();
            this.loginRef.getRef().setUsername('');
            this.loginRef.getRef().setPassword('');
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
        this.alertRef.setContent(
          this.props.intl.formatMessage({ id: 'Communication Error Occurred' })
        );
      });
  }

  @autobind
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
          ref={ref => (this.loginRef = ref)}
          onLoginClick={this.onLoginClick}
          onLogoutClick={this.onLogoutClick}
          isSubmitting={this.state.isSubmitting}
          authData={this.state.authData}
        />
        <Alert ref={ref => (this.alertRef = ref)} />
      </div>
    );
  }
}

export default withRef(LoginContainer, injectIntl);
