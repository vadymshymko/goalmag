import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './Alert.scss';

const Alert = ({ children }) => (
  <p className={styles.Alert}>{children}</p>
);

Alert.propTypes = {
  children: PropTypes.node,
};

Alert.defaultProps = {
  children: null,
};

export default withStyles(styles)(Alert);
