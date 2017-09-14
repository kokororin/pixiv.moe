import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import 'react-mdl/extra/material.js';
import 'material-design-icons/iconfont/material-icons.css';
import '@/styles/mdl/material-design-lite.scss';
import '@/styles/Base.scss';
import '@/styles/Reset.scss';

import { history } from '@/stores';
import {
  GalleryContainer,
  IllustContainer,
  RedirectContainer,
  NotFoundContainer
} from '@/containers';
import { ScrollContext, TrackPageView } from '@/components';

const AppContainer = () => (
  <Router history={history}>
    <ScrollContext>
      <TrackPageView>
        <Switch>
          <Route exact path="/" component={GalleryContainer} />
          <Route path="/illust/:illustId(\d+)" component={IllustContainer} />
          <Route path="/:illustId(\d+)" component={RedirectContainer} />
          <Route component={NotFoundContainer} />
        </Switch>
      </TrackPageView>
    </ScrollContext>
  </Router>
);

export default AppContainer;
