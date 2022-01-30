import React, {
  useState,
  useContext,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';
import { useIntl } from 'react-intl';
import { useMount } from 'ahooks';
import { useObserver } from 'mobx-react-lite';
import { IconButton, Avatar } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import * as api from '../utils/api';
import { useAlert } from '../components/Alert';
import Login, { LoginHandles } from '../components/Login';

import { AuthContext } from '../stores/AuthStore';

export interface LoginContainerHandles {
  open: (onLogin?: () => any) => void;
  close: () => void;
}

interface UserButtonProps {
  onClick: () => void;
}

export const UserButton: React.FC<UserButtonProps> = props => {
  const auth = useContext(AuthContext);

  return useObserver(() => (
    <IconButton color="inherit" onClick={props.onClick} size="large">
      {auth.authData?.user?.profile_image_urls?.px_50x50 ? (
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

const LoginContainer = forwardRef<LoginContainerHandles, {}>((props, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authData, setAuthData] = useState<any>(null);
  const [[onLogin], setOnLogin] = useState<[() => any]>([() => {}]);
  const intl = useIntl();
  const auth = useContext(AuthContext);
  const loginRef = useRef<LoginHandles>(null);
  const makeAlert = useAlert();

  useMount(() => {
    const authData = api.getAuth();
    const premiumKey = api.getPremiumKey();
    if (authData?.access_token) {
      loginRef.current?.setAuthToken(authData.access_token);
    }
    if (premiumKey) {
      loginRef.current?.setPremiumKey(premiumKey);
    }
    setAuthData(authData);
  });

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
    const authToken = loginRef.current?.getAuthToken();
    const premiumKey = loginRef.current?.getPremiumKey();
    const authType = loginRef.current?.getAuthType();

    if (authType === 'password') {
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
    } else if (authType === 'token') {
      if (authToken === '') {
        return makeAlert(
          'error',
          intl.formatMessage({ id: 'Auth Token is Blank' })
        );
      }
    } else if (authType === 'premium') {
      if (premiumKey === '') {
        return makeAlert(
          'error',
          intl.formatMessage({ id: 'Premium Key is Blank' })
        );
      }
    }

    setIsSubmitting(true);

    if (authType === 'password') {
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
    } else if (authType === 'token') {
      const authData = {
        access_token: authToken
      };
      api.setAuth(authData, auth.setAuth);
      setAuthData(authData);
      setTimeout(() => {
        close();
        loginRef.current?.reset();
        onLogin();
      }, 15);
      setIsSubmitting(false);
    } else if (authType === 'premium') {
      try {
        await api.validatePremiumKey(premiumKey);
        setIsSubmitting(false);
        api.setPremiumKey(premiumKey);
        setTimeout(() => {
          close();
          loginRef.current?.reset();
          location.reload();
        }, 15);
      } catch (err) {
        setIsSubmitting(false);
        makeAlert(
          'error',
          intl.formatMessage({
            id: 'Premium Key is Invalid'
          })
        );
      }
    }
  };

  const onLogoutClick = () => {
    api.removeAuth(auth.setAuth);
    setAuthData(null);
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
    </>
  ));
});

export default LoginContainer;
