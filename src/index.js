import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Root } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { configureStore } from '@/stores';
import AppContainer from '@/containers/AppContainer';

import { IntlProvider } from 'react-intl';
import chooseLocale from '@/locale/chooseLocale';

const lang = chooseLocale(navigator.language);

const store = configureStore();

// Render the main component into the dom
const render = Component => {
  ReactDOM.render(
    <IntlProvider locale={lang.lang} messages={lang.message}>
      <Provider store={store}>
        <Root>
          <Component />
        </Root>
      </Provider>
    </IntlProvider>,
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
