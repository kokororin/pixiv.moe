import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntl } from 'react-intl';
import { IconButton, Avatar } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import EventListener from 'react-event-listener';
import * as api from '@/utils/api';
import AlertModal from '@/components/AlertModal';
import DecoratedLogin, { Login } from '@/components/Login';
import Storage from '@/utils/Storage';

import { IAuthAction } from '@/actions/auth';

import { ICombinedState } from '@/reducers';

interface ILoginContainerProps {
  intl: InjectedIntl;
  dispatch: Dispatch<IAuthAction>;
  onRef: (ref: LoginContainer) => any;
}

interface ILoginContainerState {
  isSubmitting: boolean;
  authData: any;
}

interface IUserButtonProps {
  onClick: () => void;
  authData: any;
}

export const UserButton: React.SFC<IUserButtonProps> = props => {
  return (
    <IconButton color="inherit" onClick={props.onClick}>
      {props.authData ? (
        <Avatar
          alt="Avatar"
          style={{ width: 28, height: 28 }}
          src={api.proxyImage(props.authData.user.profile_image_urls.px_50x50)}
        />
      ) : (
        <AccountCircleIcon />
      )}
    </IconButton>
  );
};

export class LoginContainer extends React.Component<
  ILoginContainerProps,
  ILoginContainerState
> {
  static defaultProps = {
    onRef() {}
  };

  loginRef: Login;

  constructor(props: ILoginContainerProps) {
    super(props);

    this.state = {
      isSubmitting: false,
      authData: null
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    const authData = api.getAuth();
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
      return AlertModal.make(
        'error',
        this.props.intl.formatMessage({
          id: 'Web Browser does not support localStorage'
        })
      );
    }

    const username = this.loginRef.getUsername();
    const password = this.loginRef.getPassword();

    if (username === '') {
      return AlertModal.make(
        'error',
        this.props.intl.formatMessage({
          id: 'pixiv ID or Email Address is Blank'
        })
      );
    }

    if (password === '') {
      return AlertModal.make(
        'error',
        this.props.intl.formatMessage({ id: 'Password is Blank' })
      );
    }

    this.setState({
      isSubmitting: true
    });

    api
      .auth({
        username,
        password
      })
      .then((data: any) => {
        if (data.status === 'success') {
          const authData = data.response;
          api.setAuth(authData, this.props.dispatch);
          this.setState({
            authData
          });
          setTimeout(() => {
            this.close();
            this.loginRef.setUsername('');
            this.loginRef.setPassword('');
          }, 1500);
        } else {
          AlertModal.make('error', data.message);
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
        AlertModal.make(
          'error',
          this.props.intl.formatMessage({ id: 'Communication Error Occurred' })
        );
      });
  };

  onLogoutClick = () => {
    api.removeAuth(this.props.dispatch);
    this.setState({
      authData: null
    });
  };

  render() {
    return (
      <>
        <DecoratedLogin
          onRef={ref => (this.loginRef = ref)}
          onLoginClick={this.onLoginClick}
          onLogoutClick={this.onLogoutClick}
          isSubmitting={this.state.isSubmitting}
          authData={this.state.authData}
        />
        <EventListener
          target={document}
          // @ts-ignore
          onKeydown={this.onKeydown}
        />
      </>
    );
  }
}

export default connect((state: ICombinedState) => ({ auth: state.auth }))(
  injectIntl(LoginContainer)
);
