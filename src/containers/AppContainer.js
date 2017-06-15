import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'react-mdl/extra/material.js';
import 'material-design-icons/iconfont/material-icons.css';
import '@/styles/mdl/material-design-lite.scss';
import '@/styles/Base.scss';
import '@/styles/Reset.scss';
import 'classlist-polyfill';

import { configureStore, history } from '@/stores';
import {
  GalleryContainer,
  IllustContainer,
  RedirectContainer,
  NotFoundContainer
} from '@/containers';
import { TrackPageView } from '@/components';

injectTapEventPlugin();
const store = configureStore();

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <TrackPageView>
            <Switch>
              <Route exact path="/" component={GalleryContainer} />
              <Route
                path="/illust/:illustId(\d+)"
                component={IllustContainer}
              />
              <Route path="/:illustId(\d+)" component={RedirectContainer} />
              <Route component={NotFoundContainer} />
            </Switch>
          </TrackPageView>
        </ConnectedRouter>
      </Provider>
    );
  }
}
