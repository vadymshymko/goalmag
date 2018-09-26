import { createStore } from 'redux';

import rootReducer from 'reducers';
import composeEnhancers from 'composeEnhancers';

const configureStore = (preloadedState = {}) => (
  createStore(rootReducer, preloadedState, composeEnhancers())
);

export default configureStore;
