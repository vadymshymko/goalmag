import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './AppLogo.scss';

const AppLogo = () => (
  <svg
    className={styles.AppLogo}
    viewBox="0 0 30 30"
  >
    <circle cx="15" cy="15" r="15" fill="#28a745" />
    <circle cx="15" cy="15" r="3" fill="#fff" />
    <circle cx="15" cy="15" r="8" fill="none" stroke="#fff" strokeWidth="2" />
    <line x1="15" y1="0" x2="15" y2="30" stroke="#fff" strokeWidth="2" />
  </svg>
);

export default withStyles(styles)(AppLogo);
