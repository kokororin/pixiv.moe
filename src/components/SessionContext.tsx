import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import useAsyncEffect from 'use-async-effect';
import Loading from '@/components/Loading';
import Message from '@/components/Message';
import { SocketContext } from '@/components/SocketContext';
import * as api from '@/utils/api';
import Storage from '@/utils/Storage';

const useStyles = makeStyles({
  loading: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const SessionContext: React.FC<{}> = props => {
  const classes = useStyles();
  const intl = useIntl();
  const socket = React.useContext(SocketContext);
  const [token, setToken] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState(
    intl.formatMessage({
      id: 'This page is not available in your area'
    })
  );

  useAsyncEffect(async () => {
    try {
      const data = await api.session();
      setToken(data.response.access_token);
      Storage.set('token', data.response.access_token);
      api.refreshToken();
      socket.emit('pixiv.online', data.response.access_token);
      socket.on('pixiv.online.count', onlineCount => {
        console.log('debug: online clients', onlineCount);
      });
    } catch (err) {
      if (err instanceof api.APIError) {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className={classes.loading}>
        <Loading />
      </div>
    );
  }
  if (token) {
    return <>{props.children}</>;
  }
  return <Message code={403} text={message} />;
};

export default SessionContext;
