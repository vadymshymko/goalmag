import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'reducers';

const devTools = '__REDUX_DEVTOOLS_EXTENSION__';

const preloadedStore = {};

const composeEnhancers = () => {
  if (process.env.NODE_ENV === 'production' || !window || !window[devTools]) {
    return compose(applyMiddleware(thunkMiddleware));
  }

  return compose(
    applyMiddleware(thunkMiddleware),
    window[devTools](),
  );
};

const configureStore = () => (
  createStore(rootReducer, preloadedStore, composeEnhancers())
);

export default configureStore;
