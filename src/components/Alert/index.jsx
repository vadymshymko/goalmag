import React from 'react';
import PropTypes from 'prop-types';

import './Alert.scss';

const Alert = ({ children }) => (
  <p className="Alert">{children}</p>
);

Alert.propTypes = {
  children: PropTypes.node,
};

Alert.defaultProps = {
  children: null,
};

export default Alert;
