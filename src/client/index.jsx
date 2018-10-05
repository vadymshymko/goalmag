import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import Loadable from 'react-loadable';

import configureStore from 'store';
import StylesProvider from 'contextProviders/StylesProvider';

import App from 'components/App';

const history = createHistory();

const preloadedState = window.__PRELOADED_STATE__ || {}; //eslint-disable-line
delete window.__PRELOADED_STATE__; //eslint-disable-line

const store = configureStore(preloadedState);

const stylesContext = {
  insertCss: styles => (
    styles._insertCss() // eslint-disable-line no-underscore-dangle
  ),
};

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <Router history={history}>
        <StylesProvider context={stylesContext}>
          <App />
        </StylesProvider>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
});
