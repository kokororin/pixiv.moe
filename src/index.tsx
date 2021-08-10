import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Root } from 'react-hot-loader';
import iNoBounce from 'inobounce';

import AppContainer from './containers/AppContainer';

import { StoreProvider } from './stores';
import { ConnectedIntlProvider } from './stores/LocaleStore';

if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  iNoBounce.enable();
}

// Render the main component into the dom
// eslint-disable-next-line no-undef
const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <StoreProvider>
      {/*
        // @ts-ignore */}
      <ConnectedIntlProvider textComponent={React.Fragment}>
        <Root>
          <Component />
        </Root>
      </ConnectedIntlProvider>
    </StoreProvider>,
    document.getElementById('app')
  );
};

render(AppContainer);

if (module.hot) {
  module.hot.accept('./containers/AppContainer', () => {
    const NextAppContainer = require('./containers/AppContainer').default;
    render(NextAppContainer);
  });
}
