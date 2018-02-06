import React from 'react';
import PropTypes from 'prop-types';

import AppHeader from 'components/AppHeader';
import AppContent from 'components/AppContent';

import './App.scss';

const App = ({ children }) => (
  <div className="App">
    <AppHeader />

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

export default App;
