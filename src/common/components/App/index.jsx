import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppHeader from 'components/AppHeader';
import AppContent from 'components/AppContent';

import styles from './App.scss';

const App = () => (
  <div className={styles.App}>
    <AppHeader />

    <AppContent />
  </div>
);

export default withStyles(styles)(App);
