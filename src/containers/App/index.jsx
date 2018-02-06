import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AppNav from 'containers/AppNav';
import AppHeader from 'components/AppHeader';
import AppContent from 'components/AppContent';
import Container from 'components/Container';

import './App.scss';

const App = ({ children }) => (
  <div className="App">
    <AppHeader />

    <AppContent>
      <Container>
        <AppNav />

        {children}
      </Container>
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
