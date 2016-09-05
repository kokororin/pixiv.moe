import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './components/App';

ReactGA.initialize('UA-70944432-2');
ReactGA.set({
  page: window.location.pathname
});
ReactGA.pageview(window.location.pathname);

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
