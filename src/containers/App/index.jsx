import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppSidebar from 'containers/AppSidebar';
import AppContent from 'components/AppContent';

import './App.scss';

const App = ({ children }) => (
  <div className="App">
    <AppSidebar />

    <AppContent>
      {children}
    </AppContent>
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

export default withRouter(connect()(App));
