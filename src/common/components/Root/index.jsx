import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { StaticRouter, BrowserRouter } from 'react-router-dom';

import App from 'components/App';

function Root({ store, routerContext, locationURL, env }) {
  return (
    <ReduxProvider store={store}>
      {env === 'server' ? (
        <StaticRouter location={locationURL} context={routerContext}>
          <App />
        </StaticRouter>
      ) : (
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )}
    </ReduxProvider>
  );
}

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

export default memo(Root);
