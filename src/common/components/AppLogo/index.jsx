import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './AppLogo.scss';

const AppLogo = () => (
  <svg
    className={styles.AppLogo}
    viewBox="0 0 30 30"
  >
    <circle cx="15" cy="15" r="15" fill="#28a745" />
    <circle cx="15" cy="15" r="3" fill="white" />
    <circle cx="15" cy="15" r="8" fill="none" stroke="white" strokeWidth="2" />
    <line x1="15" y1="0" x2="15" y2="30" stroke="white" strokeWidth="2" />
  </svg>
);

export default withStyles(styles)(AppLogo);
