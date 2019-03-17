import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Switch,
  Route,
} from 'react-router-dom';

import routes from 'routes';

import AppHeader from 'components/AppHeader';

import styles from './App.scss';

const App = () => (
  <div className={styles.App}>
    <AppHeader />

    <div className={styles.App__Inner}>
      <Switch>
        {routes.map(({
          Component: RouteComponent,
          props = {},
          ...routeProps
        }) => (
          <Route
            {...routeProps}
            render={renderProps => (
              <RouteComponent {...renderProps} {...props} />
            )}
            key={routeProps.path}
          />
        ))}
      </Switch>
    </div>
  </div>
);

export default withStyles(styles)(App);
