import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter, BrowserRouter } from 'react-router-dom';

const Root = memo(({ store, routerContext, locationURL, env }) => {
  return (
    <ReduxProvider store={store}>
      {env === 'server' ? (
        <StaticRouter location={locationURL} context={routerContext}>
          Hello World
        </StaticRouter>
      ) : (
        <BrowserRouter>Hello World</BrowserRouter>
      )}
    </ReduxProvider>
  );
});

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
  routerContext({ env, ...props }, propName) {
    const { [propName]: propValue } = props;

    if (
      env === 'server' &&
      (propValue === undefined || typeof propValue !== 'object')
    ) {
      return new Error('Please provide routerContext!');
    }

    return null;
  },
  locationURL({ env, ...props }, propName) {
    const { [propName]: propValue } = props;

    if (
      env === 'server' &&
      (propValue === undefined || typeof propValue !== 'string')
    ) {
      return new Error('Please provide locationURL!');
    }

    return null;
  },
  env: PropTypes.oneOf(['client', 'server']).isRequired,
};

Root.defaultProps = {
  routerContext: null,
  locationURL: null,
};

export default Root;
