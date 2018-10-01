import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppLogo from 'components/AppLogo';

import styles from './AppTitle.scss';

const AppTitle = () => (
  <h1 className={styles.AppTitle}>
    <Link
      className={styles.AppTitle__link}
      to="/"
      href="/"
      title="Go To Homepage"
    >
      <AppLogo />

      Goal Magazine
    </Link>
  </h1>
);

export default withStyles(styles)(AppTitle);
