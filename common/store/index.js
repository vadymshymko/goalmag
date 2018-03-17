import { createStore } from 'redux';

import rootReducer from 'reducers';
import composeEnhancers from 'composeEnhancers';

const preloadedState = window.__PRELOADED_STATE__; //eslint-disable-line

const configureStore = () => (
  createStore(rootReducer, preloadedState, composeEnhancers())
);

export default configureStore;
