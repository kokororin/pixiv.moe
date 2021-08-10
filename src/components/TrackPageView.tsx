import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';
import * as config from '../config';

ReactGA.initialize(config.trackingID);

const TrackPageView: React.FC<{}> = props => {
  const location = useLocation();

  const track = () => {
    const pageLink = window.location.pathname;
    if (process.env.NODE_ENV === 'production') {
      ReactGA.set({
        page: pageLink
      });
      ReactGA.pageview(pageLink);
    } else {
      console.log(pageLink); // eslint-disable-line
    }
  };

  useEffect(() => {
    track();
  }, [location.pathname]);

  return <>{props.children}</>;
};

export default TrackPageView;
