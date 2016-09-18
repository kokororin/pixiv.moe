import React from 'react';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import ReactGA from 'react-ga';

import config from 'config';

import { List, Redirect, Message } from '.';

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

  routes = <Route>
             <Route
               path="/"
               component={ List } />
             <Route
               path="/:illustId"
               component={ Redirect } />
             <Route
               path="*"
               component={ Message } />
           </Route>;

  appHistory = useRouterHistory(createHashHistory)({
    queryKey: false
  });


  render() {
    return (
      <Router
        history={ this.appHistory }
        onUpdate={ this.logPageView }>
        { this.routes }
      </Router>
      );
  }

}

export default AppComponent;
