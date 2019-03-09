import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from 'reducers';

const devToolsExtName = '__REDUX_DEVTOOLS_EXTENSION__';

const { NODE_ENV } = process.env;

const composeEnhancers = () => {
  if (
    NODE_ENV === 'production' ||
    typeof window === 'undefined' ||
    !window ||
    !window[devToolsExtName]
  ) {
    return compose(applyMiddleware(thunkMiddleware));
  }

  return compose(
    applyMiddleware(thunkMiddleware),
    window[devToolsExtName](),
  );
};

const configureStore = (preloadedState = {}) => {
  const store = createStore(rootReducer, preloadedState, composeEnhancers());

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      /* eslint-disable-next-line global-require */
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
