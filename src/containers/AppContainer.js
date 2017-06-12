import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
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
import { configureStore, history } from '@/stores';
import {
  GalleryContainer,
  IllustContainer,
  RedirectContainer,
  NotFoundContainer
} from '@/containers';
import { Piwik } from '@/utils';

injectTapEventPlugin();
const store = configureStore();

@autobind
export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    ReactGA.initialize(config.trackingID);
    this.onNavigation();
    history.listen((location, action) => {
      if (action === 'PUSH') {
        this.onNavigation(location.pathname);
      }
    });
  }

  onNavigation(pageLink = window.location.pathname) {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.set({
        page: pageLink
      });
      ReactGA.pageview(pageLink);
      this.piwik ||
        (this.piwik = new Piwik({
          url: config.piwikDomain,
          siteId: config.piwikSiteId
        }));
      this.piwik.track(pageLink);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
              <Switch key={location.key} location={location}>
                <Route exact path={'/'} component={GalleryContainer} />
                <Route
                  path="/illust/:illustId(\d+)"
                  component={IllustContainer}
                />
                <Route path="/:illustId(\d+)" component={RedirectContainer} />
                <Route component={NotFoundContainer} />
              </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
