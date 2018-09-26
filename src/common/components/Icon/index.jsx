import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ className, children, ...props }) => (
  <svg
    className={`Icon ${className}`}
    {...props}
  >
    {children}
  </svg>
);

Icon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Icon.defaultProps = {
  children: null,
  className: '',
};

export default Icon;
