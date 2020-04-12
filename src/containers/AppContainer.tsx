import React from 'react';
import { Router, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {
  StylesProvider,
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
  jssPreset
} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import { create } from 'jss';

import honoka from 'honoka';
import moment from 'moment';
import 'moment/locale/ja';

import { history } from '@/stores';

import Baseline from '@/components/Baseline';
import ScrollContext from '@/components/ScrollContext';
import TrackPageView from '@/components/TrackPageView';

import config from '@/config';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: red.A200 }
  }
});

const jss = create({ plugins: [...jssPreset().plugins] });
const generateClassName = createGenerateClassName({
  productionPrefix: 'p'
});

honoka.defaults.baseURL = config.apiBaseURL;
honoka.defaults.timeout = 30e3;
moment.locale('ja');

const routes = [
  {
    exact: true,
    path: '/',
    component: require('@/containers/GalleryContainer').default
  },
  {
    path: '/illust/:illustId',
    component: require('@/containers/IllustContainer').default
  },
  {
    path: '/:illustId',
    component: require('@/containers/RedirectContainer').default
  },
  {
    component: require('@/containers/NotFoundContainer').default
  }
];

const AppContainer = () => (
  <StylesProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Baseline>
        <Router history={history}>
          <Route
            render={({ location }) => (
              <ScrollContext location={location}>
                <TrackPageView>{renderRoutes(routes)}</TrackPageView>
              </ScrollContext>
            )}
          />
        </Router>
      </Baseline>
    </MuiThemeProvider>
  </StylesProvider>
);

export default AppContainer;
