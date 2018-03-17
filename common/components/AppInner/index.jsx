import React from 'react';
import PropTypes from 'prop-types';

import './AppInner.scss';

const AppInner = ({
  children,
}) => (
  <div className="AppInner">
    {children}
  </div>
);

AppInner.propTypes = {
  children: PropTypes.node,
};

AppInner.defaultProps = {
  children: null,
};

export default AppInner;
