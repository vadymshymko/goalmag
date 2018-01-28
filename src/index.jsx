import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory as createHistory } from 'history';

import 'normalize.css';
import 'assets/styles/main.scss';

import configureStore from 'store';
import Root from 'containers/Root';

const history = createHistory();
const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <Root
      store={store}
      history={history}
    />
  </AppContainer>,
  document.getElementById('root'),
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/Root', () => {
    ReactDOM.render(
      <AppContainer>
        <Root
          store={store}
          history={history}
        />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
