import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import EventListener from 'react-event-listener';
import honoka from 'honoka';

// import Alert, { OriginalAlert } from '@/components/Alert';
import Login, { OrignalLogin } from '@/components/Login';
import moment from '@/utils/moment';
import Storage from '@/utils/Storage';

import config from '@/config';

interface ILoginContainerProps {
  intl: InjectedIntl;
  onRef: (ref: LoginContainer) => any;
}

interface ILoginContainerState {
  isSubmitting: boolean;
  authData: any;
}

class LoginContainer extends React.Component<
  ILoginContainerProps,
  ILoginContainerState
> {
  static defaultProps = {
    onRef() {}
  };

  alertRef: any;
  loginRef: OrignalLogin;

  constructor(props: ILoginContainerProps) {
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

  onKeydown = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      this.loginRef.close();
    }

    if (this.loginRef.state.isHidden === false && event.keyCode === 13) {
      this.onLoginClick();
    }
  };

  open = () => {
    this.loginRef.open();
  };

  close = () => {
    this.loginRef.close();
  };

  onLoginClick = () => {
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
      .then((data: any) => {
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
  };

  onLogoutClick = () => {
    Storage.remove('auth');
    this.setState({
      authData: null
    });
  };

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
        {/* <Alert onRef={ref => (this.alertRef = ref)} /> */}
        <EventListener
          target={document}
          // @ts-ignore
          onKeydown={this.onKeydown}
        />
      </>
    );
  }
}

export default injectIntl(LoginContainer);
