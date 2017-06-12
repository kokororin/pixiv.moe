import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '@/reducers';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  routerMiddleware(history)
)(createStore);

export function configureStore(initialState) {
  let store;
  if (process.env.NODE_ENV === 'production') {
    store = createStoreWithMiddleware(rootReducer, initialState);
  } else {
    store = createStoreWithMiddleware(
      rootReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('@/reducers', () => {
      const nextRootReducer = require('@/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
