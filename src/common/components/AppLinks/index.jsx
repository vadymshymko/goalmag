import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './AppLinks.scss';

const AppLinks = () => (
  <div className={styles.AppLinks}>
    <a
      className={styles.AppLinks__item}
      href="//github.com/vadymshymko/goalmag"
      target="_bkank"
      rel="noopener noreferrer"
      title="GitHub"
    >
      GitHub
    </a>
  </div>
);

export default withStyles(styles)(AppLinks);
