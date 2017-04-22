import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as Root } from 'react-hot-loader';

import { AppContainer } from '@/containers';


// Render the main component into the dom
const render = (Component) => {
  ReactDOM.render(
    <Root>
      <Component/>
    </Root>
    , document.getElementById('app'));
};

render(AppContainer);

if (module.hot) {
  module.hot.accept('@/containers/AppContainer', () => {
    render(AppContainer);
  });
}
