import React from 'react';
import PropTypes from 'prop-types';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import StyleContext from 'context/StyleContext';
import configureStore from 'store';

import registerServiceWorker from './registerServiceWorker';

const preloadedState = window.__PRELOADED_STATE__ || {}; //eslint-disable-line
delete window.__PRELOADED_STATE__; //eslint-disable-line

const store = configureStore(preloadedState);

const stylesContext = {
  insertCss: (...styles) => (
    styles.forEach(style => style._insertCss()) // eslint-disable-line no-underscore-dangle
  ),
};

const Root = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>
      <StyleContext context={stylesContext}>
        {children}
      </StyleContext>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

const render = () => {
  const AppComponent = require('components/App').default; //eslint-disable-line

  hydrate(
    <Root>
      <AppComponent />
    </Root>,
    document.getElementById('root'),
  );
};

loadableReady(() => {
  if (module.hot) {
    module.hot.accept('components/App', () => {
      render();
    });
  }

  registerServiceWorker({
    url: '/service-worker.js',
    scope: '/',
  });

  render();
});
