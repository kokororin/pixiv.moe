import React from 'react';
import ReactGA from 'react-ga';
import { Route } from 'react-router-dom';
import config from '@/config';

interface ITrackPageView {}

export default class TrackPageView extends React.Component<ITrackPageView> {
  constructor(props: ITrackPageView) {
    super(props);
    ReactGA.initialize(config.trackingID);
  }

  UNSAFE_componentWillMount() {
    this.track();
  }

  UNSAFE_componentWillUpdate() {
    this.track();
  }

  track() {
    const pageLink = window.location.pathname;
    if (process.env.NODE_ENV === 'production') {
      ReactGA.set({
        page: pageLink
      });
      ReactGA.pageview(pageLink);
    } else {
      console.log(pageLink); // eslint-disable-line
    }
  }

  render() {
    return <Route>{this.props.children}</Route>;
  }
}
