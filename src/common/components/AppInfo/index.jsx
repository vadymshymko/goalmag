import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';

import styles from './AppInfo.scss';

const AppInfo = () => (
  <div className={styles.AppInfo}>
    <p className={styles.AppInfo__item}>
      See app sources on <a className={styles.AppInfo__link} href="//github.com/vadymshymko/goalmag" target="_blank" rel="noopener noreferrer" title="App sources on GitHub">GitHub</a>
    </p>

    <p className={styles.AppInfo__item}>
      Football data provided by the <a className={styles.AppInfo__link} href="//www.football-data.org" target="_blank" rel="noopener noreferrer" title="Football-Data.org">Football-Data.org API</a>
    </p>
  </div>
);

export default withStyles(styles)(AppInfo);
