import React from 'react';
import { Router } from 'react-router-dom';
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

import moment from 'moment';
import 'moment/locale/ja';

import { history } from '@/stores';

import Baseline from '@/components/Baseline';
import ScrollContext from '@/components/ScrollContext';
import SessionContext from '@/components/SessionContext';
import TrackPageView from '@/components/TrackPageView';
import { AlertProvider } from '@/components/Alert';
import { SocketContext, socket } from '@/components/SocketContext';

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
      <AlertProvider>
        <Baseline>
          <Router history={history}>
            <SocketContext.Provider value={socket}>
              <SessionContext>
                <TrackPageView>
                  <ScrollContext>{renderRoutes(routes)}</ScrollContext>
                </TrackPageView>
              </SessionContext>
            </SocketContext.Provider>
          </Router>
        </Baseline>
      </AlertProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default AppContainer;
