import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
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
const generateClassName = createGenerateClassName();

honoka.defaults.baseURL = config.apiBaseURL;
honoka.defaults.timeout = 30e3;

const AppContainer = () => (
  <StylesProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Baseline>
        <Router history={history}>
          <ScrollContext>
            <TrackPageView>
              <Switch>
                <Route
                  exact
                  path="/"
                  component={require('@/containers/GalleryContainer').default}
                />
                <Route
                  path="/illust/:illustId(\d+)"
                  component={require('@/containers/IllustContainer').default}
                />
                <Route
                  path="/:illustId(\d+)"
                  component={require('@/containers/RedirectContainer').default}
                />
                <Route
                  component={require('@/containers/NotFoundContainer').default}
                />
              </Switch>
            </TrackPageView>
          </ScrollContext>
        </Router>
      </Baseline>
    </MuiThemeProvider>
  </StylesProvider>
);

export default AppContainer;
