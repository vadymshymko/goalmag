import React, { memo, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from 'routes';

function AppContent() {
  const getRouteRender = useCallback(
    RouteComponent => ({ staticContext }) => <RouteComponent staticContext={staticContext} />,//eslint-disable-line
    []
  );

  /* eslint-disable-next-line */
  const renderRoute = useCallback(
    ({ id, component, ...routeProps }) => (
      <Route render={getRouteRender(component)} {...routeProps} key={id} />//eslint-disable-line
    ),
    []
  );

  return <Switch>{routes.map(renderRoute)}</Switch>;
}

export default memo(AppContent);
