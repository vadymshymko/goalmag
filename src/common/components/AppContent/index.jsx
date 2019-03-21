import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import routes from 'routes';
import LayoutContainer from 'components/LayoutContainer';

import styles from './AppContent.scss';

const AppContent = () => (
  <div className={styles.AppContent}>
    <LayoutContainer>
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
    </LayoutContainer>
  </div>
);

export default withStyles(styles)(AppContent);
