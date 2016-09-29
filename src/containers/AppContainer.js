import React from 'react';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import ReactGA from 'react-ga';

import config from 'config';

import { ListContainer, RedirectContainer, NotFoundContainer } from '../containers';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    ReactGA.initialize(config.trackingID);
  }

  shouldComponentUpdate() {
    return false;
  }

  logPageView() {
    const pageLink = window.location.pathname + (window.location.hash == '#/' ? '' : window.location.hash);
    ReactGA.set({
      page: pageLink
    });
    ReactGA.pageview(pageLink);
  }

  routes = <Route>
             <Route
               path="/"
               component={ ListContainer } />
             <Route
               path="/:illustId"
               component={ RedirectContainer } />
             <Route
               path="*"
               component={ NotFoundContainer } />
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
