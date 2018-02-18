import React from 'react';
import PropTypes from 'prop-types';

import './AppPageHeader.scss';

const AppPageHeader = ({
  className,
  children,
}) => (
  <div className={`AppPageHeader ${className}`}>
    {children}
  </div>
);

AppPageHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

AppPageHeader.defaultProps = {
  className: '',
  children: null,
};

export default AppPageHeader;
