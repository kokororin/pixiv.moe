import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import Message from '@/components/Message';

interface IRedirectContainerRouteInfo {
  illustId: string;
}

const RedirectContainer: React.FunctionComponent<{}> = () => {
  const [isError, setIsError] = React.useState(false);
  const { illustId } = useParams<IRedirectContainerRouteInfo>();
  const intl = useIntl();

  React.useEffect(() => {
    if (!isNaN(parseFloat(illustId)) && isFinite(Number(illustId))) {
      setIsError(false);
      new Promise(resolve => setTimeout(resolve, 1500)).then(() => {
        window.location.href = `http://www.pixiv.net/member_illust.php?mode=medium&illust_id=${illustId}`;
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

export default RedirectContainer;
