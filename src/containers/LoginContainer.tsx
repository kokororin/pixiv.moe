import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
import { useIntl } from 'react-intl';
import { useObserver } from 'mobx-react-lite';
import { IconButton, Avatar } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import EventListener from 'react-event-listener';
import dayjs from 'dayjs';
import * as api from '../utils/api';
import { useAlert } from '../components/Alert';
import Login, { ILoginHandles } from '../components/Login';

import { AuthContext } from '../stores/AuthStore';

export interface ILoginContainerHandles {
  open: (onLogin?: () => any) => void;
  close: () => void;
}

interface IUserButtonProps {
  onClick: () => void;
}

export const UserButton = (props: IUserButtonProps) => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null;
  }

  return useObserver(() => (
    <IconButton color="inherit" onClick={props.onClick}>
      {auth.authData ? (
        <Avatar
          alt="Avatar"
          style={{ width: 28, height: 28 }}
          src={api.proxyImage(auth.authData.user.profile_image_urls.px_50x50)}
        />
      ) : (
        <AccountCircleIcon />
      )}
    </IconButton>
  ));
};

const LoginContainer = forwardRef<ILoginContainerHandles, {}>((props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authData, setAuthData] = useState<any>(null);
  const [[onLogin], setOnLogin] = useState<[() => any]>([() => {}]);
  const intl = useIntl();
  const auth = useContext(AuthContext);
  const loginRef = useRef<ILoginHandles>(null);
  const makeAlert = useAlert();

  if (!auth) {
    return null;
  }

  useEffect(() => {
    const authData = api.getAuth();
    setAuthData(authData);
  }, []);

  const open = (onLogin?: () => any) => {
    loginRef.current?.open();
    if (onLogin) {
      setOnLogin([onLogin]);
    }
  };

  const close = () => {
    loginRef.current?.close();
  };

  const onLoginClick = async () => {
    if (isSubmitting || !loginRef.current?.getIsOpen()) {
      return;
    }

    const username = loginRef.current?.getUsername();
    const password = loginRef.current?.getPassword();

    if (username === '') {
      return makeAlert(
        'error',
        intl.formatMessage({
          id: 'pixiv ID or Email Address is Blank'
        })
      );
    }

    if (password === '') {
      return makeAlert(
        'error',
        intl.formatMessage({ id: 'Password is Blank' })
      );
    }

    if (dayjs().year() >= 2021) {
      makeAlert(
        'error',
        intl.formatMessage({
          id: 'API Server is upgrading'
        })
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await api.auth({
        username,
        password
      });
      const authData = data.response;
      api.setAuth(authData, auth.setAuth);
      setAuthData(authData);
      setTimeout(() => {
        close();
        loginRef.current?.reset();
        onLogin();
      }, 1500);
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      makeAlert(
        'error',
        err.message ||
          intl.formatMessage({
            id: 'Communication Error Occurred'
          })
      );
    }
  };

  const onLogoutClick = () => {
    api.removeAuth(auth.setAuth);
    setAuthData(null);
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (loginRef.current?.getIsOpen() && event.keyCode === 13) {
      onLoginClick();
    }
  };

  useImperativeHandle(ref, () => ({
    open,
    close
  }));

  return useObserver(() => (
    <>
      <Login
        ref={loginRef}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        isSubmitting={isSubmitting}
        authData={authData}
      />
      <EventListener
        target={document}
        // @ts-ignore
        onKeydown={onKeydown}
      />
    </>
  ));
});

export default LoginContainer;
