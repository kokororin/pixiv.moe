import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import EventListener from 'react-event-listener';
import honoka from 'honoka';

import Alert from '@/components/Alert';
import Login from '@/components/Login';
import moment from '@/utils/moment';
import Storage from '@/utils/Storage';

import config from '@/config';

@injectIntl
export default class LoginContainer extends React.Component {
  static propTypes = {
    onRef: PropTypes.func
  };

  static defaultProps = {
    onRef() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      authData: null
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    const authData = Storage.get('auth');
    this.setState({
      authData
    });
  }

  @autobind
  onKeydown(event) {
    if (event.keyCode === 27) {
      this.loginRef.close();
    }

    if (this.loginRef.state.isHidden === false && event.keyCode === 13) {
      this.onLoginClick();
    }
  }

  @autobind
  open() {
    this.loginRef.open();
  }

  @autobind
  close() {
    this.loginRef.close();
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

    const username = this.loginRef.getUsername();
    const password = this.loginRef.getPassword();

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

    honoka
      .post(config.authURI, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          username,
          password
        }
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
      <>
        <Login
          onRef={ref => (this.loginRef = ref)}
          onLoginClick={this.onLoginClick}
          onLogoutClick={this.onLogoutClick}
          isSubmitting={this.state.isSubmitting}
          authData={this.state.authData}
        />
        <Alert onRef={ref => (this.alertRef = ref)} />
        <EventListener target={document} onKeydown={this.onKeydown} />
      </>
    );
  }
}
