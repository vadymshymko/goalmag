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
    fixtures,
  } = store.getState();

  saveDataToLocalStorage('store', {
    lastUpdated: Date.now(),
    competitions: (
      competitions.isInitialized
      && !competitions.isRequestFailed
      && !competitions.isFetching
    )
      ? competitions
      : undefined,
    fixtures: fixtures.isInitialized && !fixtures.isRequestFailed && !fixtures.isFetching
      ? {
        entities: fixtures.ids.reduce((result, id) => {
          if (
            !fixtures.entities[id]
            || !fixtures.entities[id].status
            || !(fixtures.entities[id].status.toLowerCase() === 'finished')
          ) {
            return result;
          }

          return {
            ...result,
            [id]: fixtures.entities[id],
          };
        }, {}),
        ids: fixtures.ids.filter(id => (
          fixtures.entities[id].status && (fixtures.entities[id].status.toLowerCase() === 'finished')
        )),
        initializedEndpoints: fixtures.initializedEndpoints,
        isFetching: false,
        isRequestFailed: false,
        isInitialized: true,
      }
      : undefined,
    teams: {
      ...teams,
      entities: teams.ids.reduce((result, id) => {
        if (!teams.entities[id].isInitialized || teams.entities[id].isRequestFailed) {
          return result;
        }

        return {
          ...result,
          [id]: teams.entities[id],
        };
      }, {}),
      ids: teams.ids.filter(id => (
        teams.entities[id].isInitialized && !teams.entities[id].isRequestFailed
      )),
    },
    tables: {
      ...tables,
      entities: tables.ids.reduce((result, id) => {
        if (!tables.entities[id].isInitialized || tables.entities[id].isRequestFailed) {
          return result;
        }

        return {
          ...result,
          [id]: tables.entities[id],
        };
      }, {}),
      ids: tables.ids.filter(id => (
        tables.entities[id].isInitialized && !tables.entities[id].isRequestFailed
      )),
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
