import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import App from 'containers/App';
import MatchCenterPage from 'containers/MatchCenterPage';
import CompetitionPage from 'containers/CompetitionPage';
import TeamPage from 'containers/TeamPage';

const Root = ({
  history,
  store,
}) => (
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route
            exact
            path="/match-center"
            component={MatchCenterPage}
          />

          <Route
            exact
            path="/competition/:id"
            component={CompetitionPage}
          />

          <Route
            exact
            path="/team/:id"
            component={TeamPage}
          />

          <Redirect to="/match-center" />
        </Switch>
      </App>
    </Router>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  store: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Root;
