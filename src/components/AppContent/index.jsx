import React from 'react';
import PropTypes from 'prop-types';

import Container from 'components/Container';
import AppNav from 'containers/AppNav';

import './AppContent.scss';

const AppContent = ({ children }) => (
  <div className="AppContent">
    <Container>
      <AppNav />

      {children}
    </Container>
  </div>
);

AppContent.propTypes = {
  children: PropTypes.node,
};

AppContent.defaultProps = {
  children: null,
};

export default AppContent;
