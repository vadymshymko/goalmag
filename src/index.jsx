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
  const storeTeams = store.getState().teams;
  const storeCompetitions = store.getState().competitions;

  saveDataToLocalStorage('store', {
    competitions: storeCompetitions.isInitialized
      ? storeCompetitions
      : {},
    teams: Object.keys(storeTeams).reduce((result, teamId) => {
      if (!storeTeams[teamId].isInitialized) {
        return result;
      }

      return {
        ...result,
        [teamId]: storeTeams[teamId],
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
