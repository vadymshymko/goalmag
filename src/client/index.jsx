import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

import Root from 'components/Root';

import configureStore from 'store';

const initialState = window.APP_INITIAL_STATE || {};

delete window.APP_INITIAL_STATE;

const store = configureStore(initialState);

const render = Component => {
  hydrate(
    <Component store={store} env="client" />,
    document.getElementById('root')
  );
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
