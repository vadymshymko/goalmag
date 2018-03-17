import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import AppContainer from 'containers/AppContainer';

const Root = ({
  history,
  store,
}) => (
  <Provider store={store}>
    <Router history={history}>
      <AppContainer />
    </Router>
  </Provider>
);

Root.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  store: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Root;
