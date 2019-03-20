import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './LayoutContainer.scss';

const LayoutContainer = ({ children, className, ...props }) => (
  <div className={`${styles.LayoutContainer} ${className}`} {...props}>
    {children}
  </div>
);

LayoutContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

LayoutContainer.defaultProps = {
  children: null,
  className: '',
};

export default withStyles(styles)(LayoutContainer);
