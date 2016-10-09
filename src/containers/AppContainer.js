import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import ReactGA from 'react-ga';

import config from 'config';

import { MainContainer, RedirectContainer, NotFoundContainer } from '../containers';
import { Piwik } from '../utils';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    ReactGA.initialize(config.trackingID);
  }

  shouldComponentUpdate() {
    return false;
  }

  logPageView() {
    if (config.appEnv != 'dist') {
      return;
    }
    const pageLink = window.location.pathname + (window.location.hash == '#/' ? '' : window.location.hash);
    ReactGA.set({
      page: pageLink
    });
    ReactGA.pageview(pageLink);
    this.piwik || (this.piwik = new Piwik({
      url: config.piwikDomain,
      siteId: config.piwikSiteId
    }));
    this.piwik.track(pageLink);
  }

  routeConfig =[
    {
      path: '/',
      component: MainContainer
    },
    {
      path: '/:illustId',
      component: RedirectContainer
    },
    {
      path: '*',
      component: NotFoundContainer
    }
  ];

  appHistory = useRouterHistory(createHashHistory)({
    queryKey: false
  });

  render() {
    return (
      <Router
        history={ this.appHistory }
        onUpdate={ this.logPageView }
        routes={ this.routeConfig }>
      </Router>
      );
  }

}
