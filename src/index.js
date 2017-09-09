import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Root } from 'react-hot-loader';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { configureStore } from '@/stores';
import AppContainer from '@/containers/AppContainer';

injectTapEventPlugin();

const store = configureStore();

// Render the main component into the dom
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Root>
        <Component />
      </Root>
    </Provider>,
    document.getElementById('app')
  );
};

render(AppContainer);

if (module.hot) {
  module.hot.accept('@/containers/AppContainer', () => {
    const NextAppContainer = require('@/containers/AppContainer').default;
    render(NextAppContainer);
  });
}
