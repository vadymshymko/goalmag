import React from 'react';
import Loadable from 'react-loadable';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './AppInner.scss';

const Loading = () => <div>Loading...</div>;

const MatchCenterPage = Loadable({
  loader: () => import('containers/MatchCenterPageContainer'),
  loading: Loading,
});

const CompetitionPage = Loadable({
  loader: () => import('containers/CompetitionPageContainer'),
  loading: Loading,
});

// const TeamPage = Loadable({
//   loader: () => import('containers/TeamPageContainer'),
//   loading: Loading,
// });
//
// const NotFoundPage = Loadable({
//   loader: () => import('components/NotFoundPage'),
//   loading: Loading,
// });

const AppInner = () => (
  <div className="AppInner">
    <Switch>
      <Route
        strict
        exact
        path="/match-center"
        component={MatchCenterPage}
      />

      <Route
        strict
        exact
        path="/competition/:id"
        component={CompetitionPage}
      />

      <Route
        strict
        exact
        path="/team/:id"
        component={() => (
          <div>Team Page</div>
        )}
      />

      <Redirect from="/" to="/match-center" />

      <Route
        path="*"
        component={() => (
          <div>Not found Page</div>
        )}
      />
    </Switch>
  </div>
);

export default AppInner;
