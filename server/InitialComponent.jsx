import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import AppContainer from 'containers/AppContainer';

const InitialComponent = ({
  store,
  location,
  context,
}) => (
  <Provider store={store}>
    <StaticRouter
      location={location}
      context={context}
    >
      <AppContainer />
    </StaticRouter>
  </Provider>
);

InitialComponent.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.string.isRequired,
  context: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default InitialComponent;
