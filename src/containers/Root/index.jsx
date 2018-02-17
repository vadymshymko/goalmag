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
// import PlayerPage from 'containers/PlayerPage';

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

          {/* <Route
            exact
            path="/players/:id"
            component={PlayerPage}
          /> */}

          {/* <Route
            exact
            path="/example/:id/:id"
            component={() => (
              <div>Example Page with id from id in match params</div>
            )}
          /> */}

          {/* <Route
            exact
            path="/"
            component={() => (
              <div>Default Page</div>
            )}
          /> */}

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
