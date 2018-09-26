import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory as createHistory } from 'history';
import Loadable from 'react-loadable';

import 'normalize.css';
import 'assets/styles/main.scss';

import configureStore from 'store';
import RootContainer from 'containers/RootContainer';

const history = createHistory();

const preloadedState = window.__PRELOADED_STATE__ || {}; //eslint-disable-line
delete window.__PRELOADED_STATE__; //eslint-disable-line

const store = configureStore(preloadedState);

const render = (Component) => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <AppContainer>
        <Component
          store={store}
          history={history}
        />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
};

render(RootContainer);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/RootContainer', () => {
    render(RootContainer);
  });
}
