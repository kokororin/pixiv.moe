import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {
  StylesProvider,
  createGenerateClassName,
  jssPreset
} from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { create } from 'jss';

import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import { history } from '../stores';

import Baseline from '../components/Baseline';
import ScrollContext from '../components/ScrollContext';
import SessionContext from '../components/SessionContext';
import TrackPageView from '../components/TrackPageView';
import { AlertProvider } from '../components/Alert';
import { SocketContext, socket } from '../components/SocketContext';

const theme = createTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: red.A200 }
  }
});

const jss = create({ plugins: [...jssPreset().plugins] });
const generateClassName = createGenerateClassName({
  productionPrefix: 'p'
});

dayjs.locale('ja');
dayjs.extend(LocalizedFormat);

const routes = [
  {
    exact: true,
    path: '/',
    component: require('../pages/Gallery').default
  },
  {
    path: '/illust/:illustId',
    component: require('../pages/Illust').default
  },
  {
    path: '/:illustId',
    component: require('../pages/Redirect').default
  },
  {
    component: require('../pages/NotFound').default
  }
];

const AppContainer = () => (
  <StylesProvider jss={jss} generateClassName={generateClassName}>
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  </StylesProvider>
);

export default AppContainer;
