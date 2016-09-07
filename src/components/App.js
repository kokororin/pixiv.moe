import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import List from './List';
import Redirect from './Redirect';
import Message from './Message';

class AppComponent extends React.Component {

  render() {
    return (
      <Router history={ browserHistory }>
        <Router
                path="/"
                component={ List } />
        <Route
               path="/:illustId"
               component={ Redirect } />
        <Route
               path="*"
               component={ Message } />
      </Router>
      );
  }

}

export default AppComponent;
