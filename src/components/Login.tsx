import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button, TextField } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBody: {
    width: '24em',
    background: '#fff',
    boxShadow:
      'rgba(0, 0, 0, 0.24706) 0 14px 45px, rgba(0, 0, 0, 0.21961) 0 10px 18px',
    borderRadius: '2px',
    outline: '0 none',
    '@media screen and (max-width: 600px)': {
      width: '18em'
    }
  },
  clear: {
    float: 'right',
    cursor: 'pointer',
    padding: 8
  },
  avatar: {
    left: '50%',
    '& img': {
      borderRadius: '50%',
      verticalAlign: 'middle'
    }
  },
  avatarName: {
    paddingLeft: 10,
    fontSize: 16
  },
  form: {
    height: 'auto',
    opacity: 1,
    padding: '3em'
  },
  fields: {
    opacity: 1,
    visibility: 'visible'
  },
  footer: {
    paddingTop: '1em'
  }
});

interface LoginProps {
  onLoginClick: () => void;
  onLogoutClick: () => void;
  isSubmitting: boolean;
  authData: any;
}

export interface LoginHandles {
  open: () => void;
  close: () => void;
  reset: () => void;
  getUsername: () => string;
  getPassword: () => string;
  getAuthToken: () => string;
  setAuthToken: (authToken: string) => void;
  getAuthType: () => 'token' | 'password';
  getIsOpen: () => boolean;
}

const Login = forwardRef<LoginHandles, LoginProps>((props, ref) => {
  const classes = useStyles();
  const intl = useIntl();

  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [authType] = useState<'token' | 'password'>('token');

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    reset: () => {
      setUsername('');
      setPassword('');
      // setAuthToken('');
    },
    getUsername: () => username,
    getPassword: () => password,
    getAuthToken: () => authToken,
    setAuthToken: (authToken: string) => {
      setAuthToken(authToken);
    },
    getAuthType: () => authType,
    getIsOpen: () => isOpen
  }));

  const renderContent = () => {
    if (props.authData && authType === 'password') {
      return (
        <>
          <div className={classes.avatar}>
            <span className={classes.avatarName}>
              {intl.formatMessage({ id: 'Nickname' })}「
              {props.authData.user.name}」
            </span>
          </div>
          <div className={classes.footer}>
            <Button
              variant="contained"
              color="secondary"
              onClick={props.onLogoutClick}>
              {intl.formatMessage({ id: 'Logout' })}
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
        {authType === 'password' && (
          <>
            <TextField
              onChange={event => setUsername(event.target.value)}
              value={username}
              label={intl.formatMessage({
                id: 'Email Address / pixiv ID'
              })}
              fullWidth
              margin="normal"
            />
            <TextField
              type="password"
              onChange={event => setPassword(event.target.value)}
              value={password}
              label={intl.formatMessage({
                id: 'Password'
              })}
              fullWidth
              margin="normal"
            />
          </>
        )}
        {authType === 'token' && (
          <TextField
            type="password"
            onChange={event => setAuthToken(event.target.value)}
            value={authToken}
            label={intl.formatMessage({
              id: 'Auth Token'
            })}
            fullWidth
            margin="normal"
          />
        )}
        <div className={classes.footer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={props.onLoginClick}
            disabled={props.isSubmitting}>
            {intl.formatMessage({
              id: props.isSubmitting ? 'Wait a Moment' : 'Login'
            })}
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}>
      <Fade in={isOpen}>
        <div className={classes.modalBody}>
          <div className={classes.clear} onClick={() => setIsOpen(false)}>
            <ClearIcon />
          </div>
          <div className={classes.form}>
            <div className={classes.fields}>{renderContent()}</div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
});

export default Login;
