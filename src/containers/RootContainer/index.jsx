import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import AppContainer from 'containers/AppContainer';
import MatchCenterPageContainer from 'containers/MatchCenterPageContainer';
import CompetitionPageContainer from 'containers/CompetitionPageContainer';
import TeamPageContainer from 'containers/TeamPageContainer';

const Root = ({
  history,
  store,
}) => (
  <Provider store={store}>
    <Router history={history}>
      <AppContainer>

        <Switch>
          <Route
            exact
            path="/match-center"
            component={MatchCenterPageContainer}
          />

          <Route
            exact
            path="/competition/:id"
            component={CompetitionPageContainer}
          />

          <Route
            exact
            path="/team/:id"
            component={TeamPageContainer}
          />

          <Redirect to="/match-center" />
        </Switch>

      </AppContainer>
    </Router>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  store: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Root;
