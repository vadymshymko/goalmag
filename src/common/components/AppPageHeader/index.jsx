import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './AppPageHeader.scss';

const AppPageHeader = ({
  className,
  children,
}) => (
  <div className={`${styles.AppPageHeader} ${className}`}>
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

export default withStyles(styles)(AppPageHeader);
