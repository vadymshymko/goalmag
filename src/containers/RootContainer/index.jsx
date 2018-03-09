import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AppContainer from 'containers/AppContainer';
import MatchCenterPageContainer from 'containers/MatchCenterPageContainer';
import CompetitionPageContainer from 'containers/CompetitionPageContainer';
import TeamPageContainer from 'containers/TeamPageContainer';
import NotFoundPage from 'components/NotFoundPage';

const Root = ({
  history,
  store,
}) => (
  <Provider store={store}>
    <Router history={history}>
      <AppContainer>

        <Switch>
          <Redirect
            exact
            from="/"
            to="/match-center"
          />

          <Route
            strict
            exact
            path="/match-center"
            component={MatchCenterPageContainer}
          />

          <Route
            strict
            exact
            path="/competition/:id"
            component={CompetitionPageContainer}
          />

          <Route
            strict
            exact
            path="/team/:id"
            component={TeamPageContainer}
          />

          <Route
            path="*"
            component={NotFoundPage}
          />
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
