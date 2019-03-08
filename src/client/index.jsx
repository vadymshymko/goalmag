import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import configureStore from 'store';

import App from 'components/App';

import registerServiceWorker from './registerServiceWorker';

const preloadedState = window.__PRELOADED_STATE__ || {}; //eslint-disable-line
delete window.__PRELOADED_STATE__; //eslint-disable-line

const store = configureStore(preloadedState);

const stylesContext = {
  insertCss: styles => (
    styles._insertCss() // eslint-disable-line no-underscore-dangle
  ),
};

loadableReady(() => {
  registerServiceWorker({
    url: '/service-worker.js',
    scope: '/',
  });

  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <StyleContext.Provider value={stylesContext}>
          <App />
        </StyleContext.Provider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
});
