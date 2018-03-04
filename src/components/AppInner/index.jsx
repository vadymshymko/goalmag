import React from 'react';
import PropTypes from 'prop-types';

import './AppInner.scss';

const AppInner = ({
  children,
  showContent,
}) => (
  <div className="AppInner">
    {showContent && children}
  </div>
);

AppInner.propTypes = {
  showContent: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

AppInner.defaultProps = {
  children: null,
};

export default AppInner;
