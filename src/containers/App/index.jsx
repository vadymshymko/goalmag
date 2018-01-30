import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppHeader from 'components/AppHeader';
import AppFooter from 'components/AppFooter';

import './App.scss';

const App = ({ children }) => (
  <div className="App">
    <AppHeader />

    <div className="App__content">
      {children}
    </div>

    <AppFooter />
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

App.defaultProps = {
  children: null,
};

export default withRouter(connect()(App));
