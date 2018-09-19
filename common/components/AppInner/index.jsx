import React from 'react';
import Loadable from 'react-loadable';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './AppInner.scss';

const Loading = () => <div>Loading...</div>;

// const MatchCenterPage = Loadable({
//   loader: () => import('containers/MatchCenterPageContainer'),
//   loading: Loading,
// });

// const CompetitionPage = Loadable({
//   loader: () => import('containers/CompetitionPageContainer'),
//   loading: Loading,
// });

const TeamPage = Loadable({
  loader: () => import('containers/TeamPageContainer'),
  loading: Loading,
});

const NotFoundPage = Loadable({
  loader: () => import('components/NotFoundPage'),
  loading: Loading,
});

const AppInner = () => (
  <div className="AppInner">
    <Switch>
      <Route
        strict
        exact
        path="/match-center"
        component={() => (
          <div>Match Center Page</div>
        )}
      />

      <Route
        strict
        exact
        path="/competition/:id"
        component={() => (
          <div>Competition Page</div>
        )}
      />

      <Route
        strict
        exact
        path="/team/:id"
        component={TeamPage}
      />

      <Redirect from="/" to="/match-center" />

      <Route
        path="*"
        component={NotFoundPage}
      />
    </Switch>
  </div>
);

export default AppInner;
