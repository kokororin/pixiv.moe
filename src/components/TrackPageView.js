import React from 'react';
import ReactGA from 'react-ga';
import { Route } from 'react-router-dom';
import config from '@/config';

export default class TrackPageView extends React.Component {
  constructor(props) {
    super(props);
    ReactGA.initialize(config.trackingID);
  }

  componentWillMount() {
    this.track();
  }

  componentWillUpdate() {
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
    return <Route children={this.props.children} />;
  }
}
