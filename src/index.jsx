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
    tables,
  } = store.getState();

  saveDataToLocalStorage('store', {
    lastUpdated: Date.now(),
    competitions: competitions.isInitialized
      ? competitions
      : undefined,
    teams: {
      ...teams,
      allIds: teams.allIds.filter(id => (
        teams.byId[id].isInitialized
      )),
      byId: teams.allIds.reduce((result, id) => {
        if (!teams.byId[id].isInitialized) {
          return result;
        }

        return {
          ...result,
          [id]: teams.byId[id],
        };
      }, {}),
    },
    tables: {
      ...tables,
      allIds: tables.allIds.filter(id => (
        tables.byId[id].isInitialized
      )),
      byId: tables.allIds.reduce((result, id) => {
        if (!tables.byId[id].isInitialized) {
          return result;
        }

        return {
          ...result,
          [id]: tables.byId[id],
        };
      }, {}),
    },
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
