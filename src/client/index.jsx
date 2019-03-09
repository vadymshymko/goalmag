import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import StyleContext from 'context/StyleContext';

import configureStore from 'store';

import App from 'components/App';

import registerServiceWorker from './registerServiceWorker';

const preloadedState = window.__PRELOADED_STATE__ || {}; //eslint-disable-line
delete window.__PRELOADED_STATE__; //eslint-disable-line

const store = configureStore(preloadedState);

const stylesContext = {
  insertCss: (...styles) => (
    styles.forEach(style => style._insertCss()) // eslint-disable-line no-underscore-dangle
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
        <StyleContext context={stylesContext}>
          <App />
        </StyleContext>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
});
