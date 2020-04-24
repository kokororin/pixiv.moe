import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';
import Loading from '@/components/Loading';
import Message from '@/components/Message';
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

const SessionContext: React.FunctionComponent<{}> = props => {
  const classes = useStyles();
  const intl = useIntl();
  const [token, setToken] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api
      .session()
      .then(data => {
        console.log(data);
        setToken(data.response.access_token);
        Storage.set('token', data.response.access_token);
        api.refreshToken();
      })
      .finally(() => {
        setLoading(false);
      });
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
  return (
    <Message
      code={403}
      text={intl.formatMessage({
        id: 'This page is not available in your area'
      })}
    />
  );
};

export default SessionContext;
