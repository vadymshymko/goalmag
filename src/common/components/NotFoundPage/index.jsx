import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import AppPage from 'components/AppPage';
import AppPageHeader from 'components/AppPageHeader';
import AppPageTitle from 'components/AppPageTitle';
import AppPageContent from 'components/AppPageContent';

import styles from './NotFoundPage.scss';

const NotFoundPage = () => (
  <AppPage
    title="Page Not Found"
    className={styles.NotFoundPage}
  >
    <AppPageHeader>
      <AppPageTitle>Page Not Found</AppPageTitle>
    </AppPageHeader>

    <AppPageContent>
      <p className={styles.NotFoundPage__caption}>
        Page you are looking for could not be found
      </p>
    </AppPageContent>
  </AppPage>
);

export default withStyles(styles)(NotFoundPage);
