import React from 'react';
import { Locations, Location, NotFound } from 'react-router-component';
import ReactGA from 'react-ga';
import 'material-design-icons/iconfont/material-icons.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import '../styles/Base.scss';
import '../styles/Reset.scss';
import 'classlist-polyfill';

import config from 'config';

import { MainContainer, RedirectContainer, NotFoundContainer } from '../containers';
import { Piwik } from '../utils';

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    ReactGA.initialize(config.trackingID);
    this.onNavigation = this.onNavigation.bind(this);
    this.onNavigation();
  }

  shouldComponentUpdate() {
    return false;
  }

  onNavigation() {
    if (config.appEnv !== 'dist') {
      return;
    }
    const pageLink = window.location.pathname + (window.location.hash === '#/' ? '' : window.location.hash);
    ReactGA.set({
      page: pageLink
    });
    ReactGA.pageview(pageLink);
    this.piwik || (this.piwik = new Piwik({
      url: config.piwikDomain,
      siteId: config.piwikSiteId
    }));
    this.piwik.track(pageLink);
    document.body.scrollTop = 0;
  }

  render() {
    return (
      <Locations
        hash
        onNavigation={ this.onNavigation }>
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
