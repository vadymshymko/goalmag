import React, { memo, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from 'routes';

/* eslint-disable react/jsx-props-no-spreading */
function AppContent() {
  const renderRoute = useCallback(
    ({ id, component: RouteComponent, props, ...routeProps }) => (
      <Route {...routeProps} key={id}>
        <RouteComponent {...props} />
      </Route>
    ),
    []
  );

  return <Switch>{routes.map(renderRoute)}</Switch>;
}

/* eslint-enable react/jsx-props-no-spreading */

export default memo(AppContent);
