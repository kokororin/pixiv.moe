import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import Message from '../components/Message';

interface IRedirectRouteInfo {
  illustId: string;
}

const Redirect: React.FC<{}> = () => {
  const [isError, setIsError] = useState(false);
  const { illustId } = useParams<IRedirectRouteInfo>();
  const intl = useIntl();

  useEffect(() => {
    if (!isNaN(parseFloat(illustId)) && isFinite(Number(illustId))) {
      setIsError(false);
      new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
        window.location.href = `https://www.pixiv.net/artworks/${illustId}`;
      });
    } else {
      setIsError(true);
    }
  }, []);

  return isError ? (
    <Message
      code={404}
      text={intl.formatMessage({
        id:
          'An error occurred. Check the URL or wait for a while and access again.'
      })}
    />
  ) : (
    <Message
      text={intl.formatMessage({
        id: 'Redirecting to pixiv.net'
      })}
    />
  );
};

export default Redirect;
