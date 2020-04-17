import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { IconButton, Avatar } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import EventListener from 'react-event-listener';
import * as api from '@/utils/api';
import * as AlertModal from '@/components/AlertModal';
import Login, { ILoginHandles } from '@/components/Login';

import { ICombinedState } from '@/reducers';

interface ILoginContainerProps {}

export interface ILoginContainerHandles {
  open: () => void;
  close: () => void;
}

interface IUserButtonProps {
  onClick: () => void;
}

export const UserButton = (props: IUserButtonProps) => {
  const auth = useSelector((state: ICombinedState) => state.auth);

  return (
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
  );
};

const LoginContainer = React.forwardRef<
  ILoginContainerHandles,
  ILoginContainerProps
>((props, ref) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [authData, setAuthData] = React.useState<any>(null);
  const intl = useIntl();
  const dispatch = useDispatch();
  const loginRef = React.useRef<ILoginHandles>(null);

  React.useEffect(() => {
    const authData = api.getAuth();
    setAuthData(authData);
  }, []);

  const open = () => {
    loginRef.current?.open();
  };

  const close = () => {
    loginRef.current?.close();
  };

  const onLoginClick = () => {
    if (isSubmitting || !loginRef.current?.getIsOpen()) {
      return;
    }

    const username = loginRef.current?.getUsername();
    const password = loginRef.current?.getPassword();

    if (username === '') {
      return AlertModal.make(
        'error',
        intl.formatMessage({
          id: 'pixiv ID or Email Address is Blank'
        })
      );
    }

    if (password === '') {
      return AlertModal.make(
        'error',
        intl.formatMessage({ id: 'Password is Blank' })
      );
    }

    setIsSubmitting(true);

    api
      .auth({
        username,
        password
      })
      .then((data: any) => {
        if (data.status === 'success') {
          const authData = data.response;
          api.setAuth(authData, dispatch);
          setAuthData(authData);
          setTimeout(() => {
            close();
            loginRef.current?.reset();
          }, 1500);
        } else {
          AlertModal.make('error', data.message);
        }
      })
      .then(() => {
        setIsSubmitting(false);
      })
      .catch(() => {
        setIsSubmitting(false);
        AlertModal.make(
          'error',
          intl.formatMessage({
            id: 'Communication Error Occurred'
          })
        );
      });
  };

  const onLogoutClick = () => {
    api.removeAuth(dispatch);
    setAuthData(null);
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (loginRef.current?.getIsOpen() && event.keyCode === 13) {
      onLoginClick();
    }
  };

  React.useImperativeHandle(ref, () => ({
    open: () => open(),
    close: () => close()
  }));

  return (
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
  );
});

export default LoginContainer;
