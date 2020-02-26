import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';

import rootReducer from '@/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => void;
  }
}

// Create a history of your choosing (we're using a browser history in this case)
export const history = createBrowserHistory();
// Build the middleware for intercepting and dispatching navigation actions
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export function configureStore(initialState?: any) {
  const store =
    process.env.NODE_ENV === 'production'
      ? createStoreWithMiddleware(rootReducer, initialState)
      : createStoreWithMiddleware(
          rootReducer,
          initialState,
          // @ts-ignore
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('@/reducers', () => {
      const nextRootReducer = require('@/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
