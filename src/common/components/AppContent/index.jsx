import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import routes from 'routes';

import LayoutContainer from 'components/LayoutContainer';

const AppContent = () => (
  <div style={{ maxWidth: '100%' }}>
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

export default AppContent;
