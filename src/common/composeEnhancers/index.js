import { applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

const devTools = '__REDUX_DEVTOOLS_EXTENSION__';

const composeEnhancers = () => {
  if (process.env.NODE_ENV === 'production' || typeof window === 'undefined' || !window || !window[devTools]) {
    return compose(applyMiddleware(thunkMiddleware));
  }

  return compose(
    applyMiddleware(thunkMiddleware),
    window[devTools](),
  );
};

export default composeEnhancers;
