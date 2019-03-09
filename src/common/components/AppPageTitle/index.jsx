import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './AppPageTitle.scss';

const AppPageTitle = ({
  children,
}) => (
  <h1 className={styles.AppPageTitle}>
    {children}
  </h1>
);

AppPageTitle.propTypes = {
  children: PropTypes.node,
};

AppPageTitle.defaultProps = {
  children: null,
};

export default withStyles(styles)(AppPageTitle);
