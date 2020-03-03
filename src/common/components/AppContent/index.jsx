import React, { memo, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from 'routes';

/* eslint-disable react/jsx-props-no-spreading */
function AppContent() {
  const getRouteRender = useCallback(
    (RouteComponent, componentProps) => routerProps => (
      <RouteComponent {...componentProps} {...routerProps} />
    ),
    []
  );

  const renderRoute = useCallback(
    ({ id, component, props, ...routeProps }) => (
      <Route
        render={getRouteRender(component, props)}
        {...routeProps}
        key={id}
      />
    ),
    []
  );

  return <Switch>{routes.map(renderRoute)}</Switch>;
}

/* eslint-enable react/jsx-props-no-spreading */

export default memo(AppContent);
