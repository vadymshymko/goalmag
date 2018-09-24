import React from 'react';
import Loadable from 'react-loadable';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import getRoutes from 'routes';

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
      <Redirect
        strict
        exact
        from="/"
        to="/match-center"
      />

      {getRoutes({
        MatchCenterPage,
        CompetitionPage,
        TeamPage,
        NotFoundPage,
      }).map(routeProps => (
        <Route
          {...routeProps}
          key={routeProps.path}
        />
      ))}
    </Switch>
  </div>
);

export default AppInner;
