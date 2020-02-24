import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

import Root from 'components/Root';

import configureStore from 'store';

import 'assets/styles/normalize.css';
import 'assets/styles/main.css';

const initialState = window.APP_INITIAL_STATE || {};

delete window.APP_INITIAL_STATE;

const store = configureStore(initialState);

const rootElement = document.getElementById('root');

const render = Component => {
  hydrate(<Component store={store} env="client" />, rootElement);
};

loadableReady(() => {
  if (module.hot) {
    module.hot.accept('components/Root', () => {
      const Component = require('components/Root').default; //eslint-disable-line

      render(Component);
    });
  }

  render(Root);
});
