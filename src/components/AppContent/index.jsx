import React from 'react';
import PropTypes from 'prop-types';

import './AppContent.scss';

const AppContent = ({ children }) => (
  <div className="AppContent">
    {children}
  </div>
);

AppContent.propTypes = {
  children: PropTypes.node,
};

AppContent.defaultProps = {
  children: null,
};

export default AppContent;
