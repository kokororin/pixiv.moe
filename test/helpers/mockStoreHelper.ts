import { expect } from 'chai';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middlewares = [thunk];

export default function mockStore(
  getState: any,
  expectedActions: any,
  done: any
) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ? getState() : getState;
      },

      dispatch(action: any) {
        const expectedAction = expectedActions.shift();

        try {
          expect(action).to.deep.equal(expectedAction);
          if (done && !expectedActions.length) {
            done();
          }
          return action;
        } catch (e) {
          done(e);
        }
      }
    };
  }

  const mockStoreWithMiddleware = applyMiddleware(...middlewares)(
    // @ts-ignore
    mockStoreWithoutMiddleware
  );
  // @ts-ignore
  return mockStoreWithMiddleware();
}
