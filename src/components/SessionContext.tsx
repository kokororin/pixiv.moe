import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import useAsyncEffect from 'use-async-effect';
import Loading from './Loading';
import Message from './Message';
import { SocketContext } from './SocketContext';
import * as api from '../utils/api';
import Storage from '../utils/Storage';

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
  const socket = useContext(SocketContext);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(
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
      const channelsData = await api.channels();
      const channels: { [key: string]: string } =
        channelsData.response.channels;
      socket.emit(channels.PIXIV_ONLINE, data.response.access_token);
      socket.on(channels.PIXIV_ONLINE_DONE, () => {
        setLoading(false);
      });
      socket.on(channels.PIXIV_ONLINE_COUNT, onlineCount => {
        console.log('debug: online clients', onlineCount);
      });
    } catch (err) {
      if (err instanceof api.APIError) {
        setMessage(err.message);
      } else if (
        err instanceof TypeError &&
        err.message === 'Failed to fetch'
      ) {
        setMessage('Failed to fetch');
      }
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

  let code = 403;
  const messageStart = String(message).substr(0, 3);
  if (/^\d+$/.test(messageStart)) {
    code = Number(messageStart);
  }
  return <Message code={code} text={message} />;
};

export default SessionContext;
