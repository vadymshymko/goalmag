import React, { memo, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from 'routes';

import Page from 'components/Page';

/* eslint-disable react/jsx-props-no-spreading */
function AppContent() {
  const getRouteRender = useCallback(
    (RouteComponent, componentProps) => () => (
      <RouteComponent {...componentProps} />
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

  return (
    <Page>
      <Switch>{routes.map(renderRoute)}</Switch>
    </Page>
  );
}

/* eslint-enable react/jsx-props-no-spreading */

export default memo(AppContent);
