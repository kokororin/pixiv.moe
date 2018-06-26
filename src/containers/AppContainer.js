import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import '@/styles/Base.scss';

import { history } from '@/stores';
import GalleryContainer from '@/containers/GalleryContainer';
import IllustContainer from '@/containers/IllustContainer';
import RedirectContainer from '@/containers/RedirectContainer';
import NotFoundContainer from '@/containers/NotFoundContainer';

import ScrollContext from '@/components/ScrollContext';
import TrackPageView from '@/components/TrackPageView';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: red.A200 }
  }
});

const AppContainer = () => (
  <MuiThemeProvider theme={theme}>
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
  </MuiThemeProvider>
);

export default AppContainer;
