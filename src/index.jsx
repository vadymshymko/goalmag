import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory as createHistory } from 'history';

import { saveDataToLocalStorage } from 'utils';

import 'normalize.css';
import 'assets/styles/main.scss';

import configureStore from 'store';
import Root from 'containers/Root';

const history = createHistory();
const store = configureStore();

store.subscribe(() => {
  const {
    competitions,
    teams,
  } = store.getState();

  saveDataToLocalStorage('store', {
    competitions: competitions.isInitialized
      ? competitions
      : undefined,
    teams: Object.keys(teams).reduce((result, teamId) => {
      if (!teams[teamId].isInitialized) {
        return result;
      }

      return {
        ...result,
        [teamId]: teams[teamId],
      };
    }, {}),
  });
});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component
        store={store}
        history={history}
      />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/Root', () => {
    render(Root);
  });
}
