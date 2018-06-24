import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Root } from 'react-hot-loader';
import { Provider } from 'react-redux';
import iNoBounce from 'inobounce';

import { configureStore } from '@/stores';
import AppContainer from '@/containers/AppContainer';

import ConnectedIntlProvider from '@/components/ConnectedIntlProvider';
import chooseLocale from '@/locale/chooseLocale';

const store = configureStore();

chooseLocale(navigator.language, store.dispatch);

if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  iNoBounce.enable();
}

// Render the main component into the dom
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedIntlProvider textComponent={React.Fragment}>
        <Root>
          <Component />
        </Root>
      </ConnectedIntlProvider>
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
