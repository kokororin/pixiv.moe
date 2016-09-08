import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import ReactGA from 'react-ga';

import config from 'config';

import List from './List';
import Redirect from './Redirect';
import Message from './Message';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    ReactGA.initialize(config.trackingID);
  }

  logPageView() {
    ReactGA.set({
      page: window.location.pathname
    });
    ReactGA.pageview(window.location.pathname);
  }


  render() {
    return (
      <Router
              history={ browserHistory }
              onUpdate={ this.logPageView }>
        <Route
                path="/"
                component={ List } />
        <Route
               path="/:illustId"
               component={ Redirect } />
        <Route
               path="*"
               component={ Message } />
      </Router>
      );
  }

}

export default AppComponent;
