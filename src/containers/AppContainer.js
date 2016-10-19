import React from 'react';
import { Locations, Location, NotFound } from 'react-router-component';
import ReactGA from 'react-ga';
import 'material-design-icons/iconfont/material-icons.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import '../styles/Base.scss';

import config from 'config';

import { MainContainer, RedirectContainer, NotFoundContainer } from '../containers';
import { Piwik } from '../utils';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    ReactGA.initialize(config.trackingID);
    this.logPageView();
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

  render() {
    return (
      <Locations
        hash
        onNavigation={ this.logPageView }>
        <Location
          path={ '/' }
          handler={ MainContainer } />
        <Location
          path={ '/:illustId' }
          handler={ RedirectContainer } />
        <NotFound handler={ NotFoundContainer } />
      </Locations>
      );
  }

}
