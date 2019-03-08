import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './AppPageContent.scss';

const AppPageContent = ({
  children,
}) => (
  <div className={styles.AppPageContent}>
    {children}
  </div>
);

AppPageContent.propTypes = {
  children: PropTypes.node,
};

AppPageContent.defaultProps = {
  children: null,
};

export default withStyles(styles)(AppPageContent);
