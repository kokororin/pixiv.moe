import React from 'react';
import { Locations, Location, NotFound } from 'react-router-component';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'material-design-icons/iconfont/material-icons.css';
import '@/styles/mdl/material-design-lite.scss';
import 'react-mdl/extra/material.js';
import '@/styles/Base.scss';
import '@/styles/Reset.scss';
import 'classlist-polyfill';

import config from '@/config';
import configureStore from '@/stores';
import { GalleryContainer, IllustContainer, RedirectContainer, NotFoundContainer } from '@/containers';
import { Piwik } from '@/utils';

injectTapEventPlugin();
const store = configureStore();

export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    ReactGA.initialize(config.trackingID);
    this.onNavigation();
  }

  onNavigation = () => {
    if (process.env.NODE_ENV === 'production') {
      const pageLink = window.location.pathname;
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

  // document.body.scrollTop = 0;
  };

  render() {
    return (
      <Provider store={ store }>
        <Locations onNavigation={ this.onNavigation }>
          <Location
            path={ '/' }
            handler={ GalleryContainer } />
          <Location
            path={ /^\/illust\/([0-9]{0,}$)/ }
            handler={ IllustContainer } />
          <Location
            path={ /^\/([0-9]{0,}$)/ }
            handler={ RedirectContainer } />
          <NotFound handler={ NotFoundContainer } />
        </Locations>
      </Provider>
    );
  }

}
